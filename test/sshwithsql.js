var Client = require('ssh2').Client
var mysql = require('mysql2')

// const remote = '172.16.10.45'
const remote = '39.104.226.149'

var conn = new Client()
conn.on('ready', function () {
  console.log('Client :: ready')
  conn.forwardOut(
    '127.0.0.1',
    12345,
    '127.0.0.1',
    3306,
    function callback (err, stream) {
      // you will probably want to handle this better,
      // in case the tunnel couldn't be created due to server restrictions
      console.log('err:', err)
      if (err) throw err

      // if you use `sqlConf` elsewhere, be aware that the following will
      // mutate that object by adding the stream object for simplification purposes

      var sql = mysql.createConnection({
        user: 'root',
        password: 'root',
        database: 'spider',
        stream: stream // <--- this is the important part
      })

      sql.query('select * from oss limit 1', function (error, results, fields) {
        if (error) throw error
        console.log('The solution is: ', results[0])
      })

      // now use `db` to make your queries
    }
  )
}).connect({
  host: remote,
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
