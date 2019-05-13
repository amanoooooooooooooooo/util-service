const net = require('net')

const { randomPort } = require('../utils')
const { CMD_ERR_PORT, CMD_SERVER_PORT } = require('../constants')
var httpHeaders = require('http-headers')

let tempSocket
function generateServer (daemonSocket) {
  //   console.log('daemonSocket is ', daemonSocket)

  const port = randomPort(40000)

  const server = net.createServer(function (socket) {
    console.log('tempSocket start')
    socket.setKeepAlive(false)
    socket.setTimeout(1000)

    tempSocket = socket

    socket.setEncoding('utf8')

    socket.on('data', function (data) {
      console.log('tempSocket ondata \n', data.slice(0, 200))
      const headerObj = httpHeaders(data)
      if (headerObj.method) {
        daemonSocket.emit('buffer', data)
      } else {
        console.error('invalid data', data)
        socket.end()
      }
    })

    // socket.on('data', function (data) {
    //   socket.write('HTTP/1.1 200 OK\r\n\r\n{}')
    //   // socket.pipe(socket)
    //   socket.end()
    //   console.log('data ', data)
    // })
    socket.on('close', () => {
      console.log('tempSocket onclose')
    })
    socket.on('end', function (data) {
      console.log('tempSocket onend \n', data)
    })
    socket.on('error', function (err) {
      console.log('tempSocket socket error', err)
      socket.destroy()
    })
  })

  server.listen(port, (err, result) => {
    if (err) {
      console.error('error ', err)
    }
    console.log('tempServer listen')
    daemonSocket.emit('cmd', { type: CMD_SERVER_PORT, value: port })
  })
  server.on('error', e => {
    if (e.code === 'EADDRINUSE') {
      console.log('地址正被使用', e)
      daemonSocket.emit('cmd', { type: CMD_ERR_PORT })
    }
  })
  return server
}

const getTempSocket = () => {
  return tempSocket
}

module.exports = {
  generateServer,
  getTempSocket
}
