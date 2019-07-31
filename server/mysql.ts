import { ClientChannel } from "ssh2";

import mysql from 'mysql2'

const {
  useSshForward
} = require('./ssh')

const DB_HOST = process.env.DB_HOST || '127.0.0.1' // '172.16.10.45' || "localhost"
const DB_PORT = process.env.DB_PORT || '3306'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASS = process.env.DB_PASS || 'root'
const DB_NAME = process.env.DB_NAME || 'spider' // 'ethwallet' 'testbankwallet' || "ethwallet" || "bankwallet_dev"
const ENV = process.env.ENV

console.log('ENV:', ENV)

const sqlConf = {
  connectionLimit: 10,
  host: DB_HOST,
  port: parseInt(DB_PORT),
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME
}

let pool: any
let promisePool: any

async function callback(err: Error, stream: ClientChannel, resolve: Function, reject: Function) {
  if (err) {
    reject(err)
  }

  pool = mysql.createPool({
    ...sqlConf,
    stream: stream // <--- this is the important part
  })

  promisePool = pool.promise()
  resolve(promisePool)
}


export async function getPool() {
  if (typeof promisePool === 'undefined') {
    console.warn('extra init')
    await init()
  }
  return promisePool
}

export async function init() {
  if (ENV === 'prod') {
    pool = mysql.createPool(sqlConf)
    return promisePool = pool.promise()
  } else {
    return await useSshForward(callback)
  }
}