var Promise = require('bluebird')
var mysql = require('mysql')
Promise.promisifyAll(mysql)
Promise.promisifyAll(require('mysql/lib/Connection').prototype)
Promise.promisifyAll(require('mysql/lib/Pool').prototype)

const DB_NAME = process.env.DB_NAME || 'spider' // 'ethwallet' 'testbankwallet' || "ethwallet" || "bankwallet_dev"
const DB_USER = process.env.DB_USER || 'root'
const DB_PASS = process.env.DB_PASS || 'root'
const DB_HOST = process.env.DB_HOST || '39.104.226.149' // '172.16.10.45' || "localhost"
const DB_PORT = process.env.DB_PORT || 3306

var pool = mysql.createPool({
  connectionLimit: 20,
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME
})

exports.pool = pool
