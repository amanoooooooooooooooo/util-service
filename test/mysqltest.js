var mysql = require('promise-mysql')

mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'admin',
  database: 'yellow_page'
}).then(function (conn) {
  // do stuff with conn
  console.log('conn success')
  conn.end()
})
