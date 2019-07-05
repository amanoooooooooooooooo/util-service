// var fetch = require('isomorphic-unfetch')
const dao = require('../dao')
const { ResultUtil } = require('../../utils')
const { sendMail } = require('../mail')

const addControllers = (server) => {
  server.get('/spider/api/oss', async (req, res) => {
    const ossRows = await dao.queryOssRows()
    res.json(ResultUtil.success(ossRows))
  })
  server.get('/spider/api/novel/:id/:chapter', async (req, res) => {
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
        throw new Error('/spider/novelapi/:id/:chapter error')
    }
  })
  server.get('/spider/api/novel/:id', async (req, res) => {
    const { id } = req.params
    const chapters = await dao.queryNovelChapters(id)
    res.json(ResultUtil.success(chapters))
  })

  server.post('/spider/api/mail', async (req, res) => {
    const { body } = req
    const { to, subject, text, html } = body
    if (!to || !subject) {
      res.json(ResultUtil.fail('参数错误'))
    }
    try {
      const result = await sendMail(to, subject, text, html)
      res.json(ResultUtil.success(result))
    } catch (e) {
      console.error('sendMail error ', e)
      res.json(ResultUtil.fail('发送失败'))
    }
  })

  server.post('/spider/api/novel', async (req, res) => {
    const { body } = req
    const { name, crawlUrl } = body
    console.log('name %s, crawlurl %s', name, crawlUrl)
    const ossRow = {
      name,
      type: 'NOVEL',
      crawl_url: crawlUrl
    }
    const result = await dao.insertOss(ossRow)
    res.json(ResultUtil.success(result))
  })
}
module.exports = {
  addControllers
}
