var Client = require('ssh2').Client

var conn = new Client()
conn.on('ready', function () {
  console.log('Client :: ready')
  conn.exec('uptime', function (err, stream) {
    if (err) throw err
    stream.on('close', function (code, signal) {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal)
      conn.end()
    }).on('data', function (data) {
      console.log('STDOUT: ' + data)
    }).stderr.on('data', function (data) {
      console.log('STDERR: ' + data)
    })
  })
}).connect({
  host: '39.104.226.149',
  port: 22,
  username: 'root',
  privateKey: require('fs').readFileSync('/Users/hikaruamano/.ssh/id_rsa')
})

// example output:
// Client :: ready
// STDOUT:  17:41:15 up 22 days, 18:09,  1 user,  load average: 0.00, 0.01, 0.05
//
// Stream :: exit :: code: 0, signal: undefined
// Stream :: close
