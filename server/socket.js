const { CMD_GENERATE, CMD_CLOSE, CMD_GET_CON } = require('../constants')

const { generateServer, getTempSocket } = require('./generateServer')

let tempServer
function io (server) {
  const io = require('socket.io')(server)
  io.on('connection', function (socket) {
    console.log('server daemon on connection')
    socket.on('cmd', function (data) {
      console.log('server cmd:', data)
      switch (data.type) {
        case CMD_GENERATE:
          tempServer = generateServer(socket)
          break
        case CMD_GET_CON:
          tempServer.getConnections((err, result) => {
            console.log('getConnections ', err, result)
            socket.emit('common', 'getConnections ' + result)
          })
          break
        case CMD_CLOSE:
          tempServer &&
            tempServer.close((err, code) => {
              console.log('close tempSocket ', err, code)
            })
          break
        default:
          console.log('unhandled data ', data)
          break
      }
    })
    socket.on('buffer', function (data) {
      console.log('server buffer ----------- \n', data.slice(0, 500))
      const tempSocket = getTempSocket()
      const cb = () => {
        console.log('end cb')
      }
      tempSocket && tempSocket.write(data)
      // tempSocket && tempSocket.end(null, cb)
      // tempSocket && tempSocket.close()
      // tempSocket && tempSocket.destroy()
      tempSocket && tempSocket.pipe(tempSocket)
    })
    socket.on('comon', function (data) {
      console.log('server common ----------- \n', data)
    })
    socket.on('error', error => {
      console.log('socket err ', error)
    })
    socket.on('disconnecting', reason => {
      let rooms = Object.keys(socket.rooms)
      console.log('disconnecting rooms ', rooms)
    })
  })
}

module.exports = io
