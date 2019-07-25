var mysql = require('mysql2')

const { useSshForward } = require('./ssh')

const DB_HOST = process.env.DB_HOST || '127.0.0.1' // '172.16.10.45' || "localhost"
const DB_PORT = process.env.DB_PORT || 3306
const DB_USER = process.env.DB_USER || 'root'
const DB_PASS = process.env.DB_PASS || 'root'
const DB_NAME = process.env.DB_NAME || 'spider' // 'ethwallet' 'testbankwallet' || "ethwallet" || "bankwallet_dev"
const ENV = process.env.ENV

console.log('ENV:', ENV)

const sqlConf = {
  connectionLimit: 10,
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME
}

let pool
let promisePool

async function callback (err, stream) {
  if (err) throw err

  pool = mysql.createPool({
    ...sqlConf,
    stream: stream // <--- this is the important part
  })
  promisePool = pool.promise()
}
if (ENV === 'prod') {
  pool = mysql.createPool(sqlConf)
  promisePool = pool.promise()
} else {
  useSshForward(callback)
}

function getPool () {
  return promisePool
}
exports.getPool = getPool
exports.pool = promisePool
