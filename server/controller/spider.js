// var fetch = require('isomorphic-unfetch')
const dao = require('../dao')
const { ResultUtil } = require('../../utils')
const { sendMail } = require('../mail')
const { pool } = require('../mysql')

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
    const rows = await dao.queryOssWithOption(name, crawlUrl)
    if (rows.length > 0) {
      res.json(ResultUtil.fail('已存在'))
    } else {
      const result = await dao.insertOss(ossRow)
      res.json(ResultUtil.success(result))
    }
  })

  server.post('/spider/api/sub', async (req, res) => {
    const { body } = req
    const { mail, nick, id: ossId } = body
    const userRow = {
      mail,
      nick
    }

    console.log('userRow', userRow)

    const conn = await pool.getConnectionAsync()
    // console.log('got conn %o', conn)
    await conn.beginTransactionAsync()

    try {
      const rows = await dao.queryUserWithOption(conn, mail)
      let userId = -1
      if (rows.length === 0) {
        const res = await dao.insertUser(conn, userRow)
        console.log('insertUser is ', res)
        userId = res.insertId
      } else {
        userId = rows[0].id
      }
      console.log('userId ', userId)
      console.log('ossId ', userId)

      const rssRow = {
        user_id: userId,
        oss_id: ossId
      }
      await dao.insertRss(conn, rssRow)
      await conn.commitAsync()

      res.json(ResultUtil.success())
    } catch (e) {
      console.error('spider/api/sub e', e)
      await conn.rollbackAsync()
      res.json(ResultUtil.fail(e))
    } finally {
      conn.release()
    }
  })
}
module.exports = {
  addControllers
}
