var fetch = require('isomorphic-unfetch')

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
}
module.exports = {
  addControllers
}
