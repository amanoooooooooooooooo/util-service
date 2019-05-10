const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const LISTEN_PORT = process.env.LISTEN_PORT || 3000

const app = express()

app.use(express.json()) // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }))

const server = require('http').Server(app)

const io = require('socket.io')(server)
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' })
  socket.on('my other event', function (data) {
    console.log(data)
  })
})

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
