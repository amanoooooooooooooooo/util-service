const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const compression = require('compression')
const WebSocket = require('ws')

const { addControllers } = require('./controller')


nextApp.prepare()
  .then(() => {
    const app = express()
    const server = require('http').Server(app)
    const wss = new WebSocket.Server({ server })
    wss.on('connection', function connection(ws) {
      ws.on('message', function incoming(message) {
        console.debug('received: %s', message)
        ws.send('ws ondata push:' + message)
      })
      ws.send('ws on connection')
      setInterval(() => {
        ws.send('ws task push:' + Math.random())
      }, 3 * 1000);
    })

    app.use(compression())
    app.use(express.json()) // to support JSON-encoded bodies
    app.use(express.urlencoded({ extended: true }))

    addControllers(app)

    app.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
