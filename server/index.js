const express = require('express')
const next = require('next')

const io = require('./socket')
const { addControllers } = require('./controller')

const { LISTEN_PORT } = require('../constants')
const dev = process.env.NODE_ENV !== 'production'

const app = express()

app.use(express.json()) // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }))
addControllers(app)

const server = require('http').Server(app)

io(server)

const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare()
  .then(() => {
    app.get('/p/:id', (req, res) => {
      const actualPage = '/post'
      const queryParams = { title: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    app.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(LISTEN_PORT, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${LISTEN_PORT}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
