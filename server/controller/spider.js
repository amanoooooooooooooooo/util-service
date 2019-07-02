// var fetch = require('isomorphic-unfetch')
const dao = require('../dao')
const { ResultUtil } = require('../../utils')

const addControllers = (server) => {
  server.get('/spider/oss', async (req, res) => {
    const ossRows = await dao.queryOssRows()
    res.json(ResultUtil.success(ossRows))
  })
  server.get('/spider/novel/:id/:chapter', async (req, res) => {
    const { id, chapter } = req.params
    const novelRows = await dao.queryNovelRow(id, chapter)
    switch (novelRows.length) {
      case 0:
        res.json(ResultUtil.fail('NOT EXIST'))
        break
      case 1:
        res.json(ResultUtil.success(novelRows[0]))
        break
      default:
        throw new Error('/spider/novel/ error')
    }
  })
}
module.exports = {
  addControllers
}
