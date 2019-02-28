var fetch = require('isomorphic-unfetch')
const Core = require('@alicloud/pop-core')

const SECERT_ID = 'LTAIUKIAm1UCzLJt'
const SECERT_KEY = 'u6C6Iv6ayprCnlMD8eLBFt1TuNDY2j'

const Client = (secretId, secertKey) => new Core({
  accessKeyId: secretId,
  accessKeySecret: secertKey,
  endpoint: 'https://alidns.aliyuncs.com',
  apiVersion: '2015-01-09'
})
const addControllers = (server) => {
  server.get('/header', (req, res) => {
    res.json(req.headers)
  })

  server.get('/utilwebhook', async (req, res) => {
    const resp = await fetch('http://fe2o3.club:9000/api/webhooks/376fc971-5cdf-4bcb-9a0d-78c9bdd12b1a', {
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
    const { secretId, secertKey, domainName, RR, type, value } = body || {}
    var client = Client(secretId, secertKey)
    const requestParams = {
      DomainName: domainName, // util.online
      RR: RR, // lin2heart
      Type: type, // A | NS | MX | TXT | CNAME | SRV | AAAA | CAA | REDIRECT_URL | FORWARD_URL refre to https://help.aliyun.com/document_detail/29805.html?spm=a2c4g.11186623.2.20.118a2846NGdMrE
      Value: value // 10.10.1.214
    }
    var requestOption = {
      method: 'POST'
    }
    client.request('AddDomainRecord', requestParams, requestOption).then((result) => {
      res.json(result)
    }).catch(e => {
      res.json(e)
    })
  })
}
module.exports = {
  addControllers
}
