const { pool } = require('./mysql')
const camelcaseKeys = require('camelcase-keys')

async function queryOssRows () {
  const rows = await pool.queryAsync('SELECT * FROM oss ')
  console.log('row ', camelcaseKeys(rows))
}

queryOssRows()
