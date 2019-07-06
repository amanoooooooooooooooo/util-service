var mysql = require('promise-mysql')

mysql.createConnection({
  host: '39.104.226.149',
  user: 'root',
  password: 'root',
  database: 'spider'
}).then(function (conn) {
  // do stuff with conn
  console.log('conn success')
  conn.query('insert into user set ?', [{ nick: 12 }], function name (e, r) {
    console.log('e ', e, r)
  })
})
