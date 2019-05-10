
const { CMD_GENERATE, CMD_CLOSE, CMD_GET_CON } = require('../constants')

const { generateServer, getTempSocket } = require('./generateServer')

let tempServer
function io (server) {
  const io = require('socket.io')(server)
  io.on('connection', function (socket) {
    socket.emit('common', 'i am server')
    socket.on('common', function (data) {
      console.log('socket on common ', data)
      switch (data) {
        case CMD_GENERATE:
          tempServer = generateServer(socket)
          break
        case CMD_GET_CON:
          tempServer.getConnections((err, result) => {
            console.log('getConnections ', err, result)
          })
          break
        case CMD_CLOSE:
          tempServer && tempServer.close((err, code) => {
            console.log('close tempSocket ', err, code)
          })
          break
        default:
          console.log('invalid data ', data)
          break
      }
    })
    socket.on('buffer', function (data) {
      console.log('socket on buffer -----------', !!getTempSocket())
      console.log(data)
      getTempSocket() && getTempSocket().end(data)
    })
    socket.on('error', (error) => {
      console.log('socket err ', error)
    })
    socket.on('disconnecting', (reason) => {
      let rooms = Object.keys(socket.rooms)
      console.log('disconnecting rooms ', rooms)
    })
  })
}

module.exports = io
