const net = require('net')

let tempSocket
function generateServer (daemonSocket) {
//   console.log('daemonSocket is ', daemonSocket)

  const server = net.createServer(function (socket) {
    console.log('generateServer start %o')

    tempSocket = socket
    // console.debug('debug tempSocket init')
    // console.log('debug remoteAddress', socket.remoteAddress)
    // console.log('debug localAddress', socket.localAddress)
    // console.log('debug localPort', socket.localPort)
    // console.log('debug remotePort', socket.remotePort)

    socket.setEncoding('utf8')

    socket.on('data', function (data) {
      console.log('generateServer socket onData ', data.length, data)
      daemonSocket.emit('buffer', data)
    })

    // socket.pipe(daemonSocket)
    // socket.on('end', function () {
    //   console.log('generateServer socket onEnd %o', socket, arguments)
    //   console.log('generateServer onend ', ...arguments)

    // })
    socket.on('end', socket.end)
    socket.on('error', function (err) {
      console.log('generateServer socket error', err)
      socket.destroy()
      server.close()
    })
  })

  server.listen(3002, (err, result) => {
    if (err) {
      console.error('error ', err)
    }
    console.log('generateServer start')
  })
  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.log('地址正被使用', e)
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
