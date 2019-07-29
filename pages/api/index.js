const { send } = require('micro')
const methods = require('micro-method-router')

module.exports = methods({
  async get (req, res) {
    return send(res, 200, `It's a GET request!`)
  },
  async post (req, res) {
    return send(res, 200, `It's a POST request!`)
  }
})
