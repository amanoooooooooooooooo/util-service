var fetch = require('isomorphic-unfetch')
const Core = require('@alicloud/pop-core')

const { delay } = require('../utils')

const SECERT_ID = process.env.SECERT_ID
const SECERT_KEY = process.env.SECERT_KEY
console.log('SECERT_ID is %s, SECERT_KEY is %s', SECERT_ID, SECERT_KEY)

const Client = (secretId, secertKey) => new Core({
  accessKeyId: secretId || SECERT_ID,
  accessKeySecret: secertKey || SECERT_KEY,
  endpoint: 'https://alidns.aliyuncs.com',
  apiVersion: '2015-01-09'
})
const addControllers = (server) => {
  server.get('/headers', (req, res) => {
    res.json(req.headers)
  })

  server.get('/utilwebhook', async (req, res) => {
    const resp = await fetch('http://39.104.226.149:9000/api/webhooks/376fc971-5cdf-4bcb-9a0d-78c9bdd12b1a', {
      method: 'POST'
    }).then((res) => res.text())
    res.json(resp)
  })

  server.post('/dns/list', async (req, res) => {
    const { body } = req
    const { secretId, secertKey } = body || {}
    var client = Client(secretId, secertKey)
    const requestParams = {
      DomainName: 'util.online'
    }
    var requestOption = {
      method: 'POST'
    }
    client.request('DescribeDomainRecords', requestParams, requestOption).then((result) => {
      res.json(result)
    }).catch(e => {
      res.json(e)
    })
  })
  server.post('/dns/del', async (req, res) => {
    const { body } = req
    const { secretId, secertKey, recordId } = body || {}
    var client = Client(secretId, secertKey)
    const requestParams = {
      RecordId: recordId
    }
    var requestOption = {
      method: 'POST'
    }
    client.request('DeleteDomainRecord', requestParams, requestOption).then((result) => {
      res.json(result)
    }).catch(e => {
      res.json(e)
    })
  })
  server.post('/dns/add', async (req, res) => {
    const { body } = req
    const { secretId, secertKey, domainName = 'util.online', RR, type = 'A', value } = body || {}
    var client = Client(secretId, secertKey)
    const requestParams = {
      DomainName: domainName, // util.online
      RR: RR, // lin2heart
      Type: type, // A | NS | MX | TXT | CNAME | SRV | AAAA | CAA | REDIRECT_URL | FORWARD_URL refre to https://help.aliyun.com/document_detail/29805.html?spm=a2c4g.11186623.2.20.118a2846NGdMrE
      Value: value // 10.10.1.214
    }
    console.log('requestParamsj is', requestParams)
    var requestOption = {
      method: 'POST'
    }
    client.request('AddDomainRecord', requestParams, requestOption).then((result) => {
      res.json(result)
    }).catch(e => {
      res.json(e)
    })
  })

  server.get('/delay/:times', async (req, res) => {
    const { times } = req.params
    await delay(parseInt(times))
    res.json('')
  })
  server.get('/sdk', async (req, res) => {
    const { name, pass } = req.query
    res.json({
      name,
      pass,
      date: new Date()
    })
  })
}
module.exports = {
  addControllers
}
