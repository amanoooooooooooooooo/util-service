const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const compression = require('compression')
const WebSocket = require('ws')

const commonController = require('./controller/common')
const spiderController = require('./controller/spider')

const morgan = require('morgan') 

nextApp.prepare()
  .then(() => {
    const app = express()
    const server = require('http').Server(app)

    const wss = new WebSocket.Server({ server })
    wss.on('connection', function connection (ws) {
      ws.on('message', function incoming (message) {
        console.debug('received: %s', message)
        ws.send('ws ondata push:' + message)
      })
      ws.send('ws on connection')
      setInterval(() => {
        ws.send('ws task push:' + Math.random())
      }, 3 * 1000)
    })

    app.use(compression())
    app.use(express.json()) // to support JSON-encoded bodies
    app.use(express.urlencoded({ extended: true }))

    app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms'))

    commonController.addControllers(app)
    spiderController.addControllers(app)

    app.get('/spider/novel/:id', (req, res) => {
      const { id } = req.params
      const actualPage = '/spider/chapters'
      const queryParams = { id }
      nextApp.render(req, res, actualPage, queryParams)
    })

    app.get('/spider/novel/:id/:chapter', (req, res) => {
      const { id, chapter } = req.params
      const actualPage = '/spider/chapter'
      const queryParams = { id, chapter }
      nextApp.render(req, res, actualPage, queryParams)
    })

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
