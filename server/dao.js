const { getPool } = require('./mysql')
const camelcaseKeys = require('camelcase-keys')

async function queryOssRows (type = 'NOVEL', pageSize, pageNum) {
  const from = (pageNum - 1) * pageSize
  const offset = pageSize

  const [rows] = await getPool().query('SELECT * FROM oss WHERE `type` = ? ORDER BY id DESC LIMIT ? , ' + offset, [type, from]
  )
  return camelcaseKeys(rows)
}
async function queryNovelRow (id, chapter) {
  const [rows] = await getPool().query(`SELECT * FROM novel WHERE oss_id = ${id} AND chapter_index = ${chapter} `)
  return camelcaseKeys(rows)
}
async function queryRssRows (userId, ossId) {
  const [rows] = await getPool().query(`SELECT * FROM rss WHERE user_id = ${userId} AND oss_id = ${ossId} `)
  return camelcaseKeys(rows)
}

async function queryNovelChapters (id) {
  const [rows] = await getPool().query(`SELECT chapter_index, chapter_title FROM novel WHERE oss_id = ${id} `)
  return camelcaseKeys(rows)
}
async function insertOss (oss) {
  const [result] = await getPool().query(`INSERT INTO oss SET ?  `, [oss])
  return result
}
async function insertUser (conn, user) {
  const [result] = await conn.query(`INSERT INTO user SET ?  `, [user])
  return result
}
async function insertRss (conn, rss) {
  const [result] = await conn.query(`INSERT INTO rss SET ?  `, [rss])
  return result
}
async function queryOssWithOption (name, crawlUrl) {
  const suffix = crawlUrl ? ' AND crawl_url = "' + crawlUrl + '" ' : ''
  const [rows] = await getPool().query(`SELECT * FROM oss where name = ? ${suffix}`, [name])
  return camelcaseKeys(rows)
}
async function queryUserWithOption (conn, mail) {
  const [rows] = await conn.query(`SELECT * FROM user where mail = ? `, [mail])
  return camelcaseKeys(rows)
}
async function updateUser (user, id) {
  return getPool().query(`UPDATE user SET ? WHERE id = ?`, [user, id])
}
async function queryOssInRss (userId) {
  const [rows] = await getPool().query(`SELECT * FROM rss LEFT JOIN oss ON rss.oss_id = oss.id WHERE  user_id = ?`, [userId])
  return camelcaseKeys(rows)
}
async function queryPhotoRows (ossId) {
  const [rows] = await getPool().query('SELECT * FROM photo WHERE oss_id = ? ', [ossId])
  return camelcaseKeys(rows)
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
exports.queryOssInRss = queryOssInRss
exports.queryPhotoRows = queryPhotoRows
