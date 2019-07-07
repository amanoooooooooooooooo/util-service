const { pool } = require('./mysql')
const camelcaseKeys = require('camelcase-keys')

async function queryOssRows () {
  const rows = await pool.queryAsync('SELECT * FROM oss ')
  return camelcaseKeys(rows)
}
async function queryNovelRow (id, chapter) {
  const rows = await pool.queryAsync(`SELECT * FROM novel WHERE oss_id = ${id} AND chapter_index = ${chapter} `)
  return camelcaseKeys(rows)
}
async function queryRssRows (userId, ossId) {
  const rows = await pool.queryAsync(`SELECT * FROM rss WHERE user_id = ${userId} AND oss_id = ${ossId} `)
  return camelcaseKeys(rows)
}

async function queryNovelChapters (id) {
  const rows = await pool.queryAsync(`SELECT chapter_index, chapter_title FROM novel WHERE oss_id = ${id} `)
  return camelcaseKeys(rows)
}
async function insertOss (oss) {
  const result = await pool.queryAsync(`INSERT INTO oss SET ?  `, [oss])
  return result
}
async function insertUser (conn, user) {
  const result = await conn.queryAsync(`INSERT INTO user SET ?  `, [user])
  return result
}
async function insertRss (conn, rss) {
  const result = await conn.queryAsync(`INSERT INTO rss SET ?  `, [rss])
  return result
}
async function queryOssWithOption (name, crawlUrl) {
  const suffix = crawlUrl ? ' AND crawl_url = "' + crawlUrl + '" ' : ''
  const rows = await pool.queryAsync(`SELECT * FROM oss where name = ? ${suffix}`, [name])
  return camelcaseKeys(rows)
}
async function queryUserWithOption (conn, mail) {
  const rows = await conn.queryAsync(`SELECT * FROM user where mail = ? `, [mail])
  return camelcaseKeys(rows)
}
async function updateUser (user, id) {
  return pool.queryAsync(`UPDATE user SET ? WHERE id = ?`, [user, id])
}

exports.queryOssRows = queryOssRows
exports.queryNovelRow = queryNovelRow
exports.queryNovelChapters = queryNovelChapters
exports.queryOssWithOption = queryOssWithOption
exports.queryUserWithOption = queryUserWithOption
exports.insertOss = insertOss
exports.insertUser = insertUser
exports.insertRss = insertRss
exports.queryRssRows = queryRssRows
exports.updateUser = updateUser
