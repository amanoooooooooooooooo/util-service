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

exports.queryOssRows = queryOssRows
exports.queryNovelRow = queryNovelRow
