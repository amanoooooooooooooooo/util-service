
const addControllers = (server) => {
  server.get('/header', (req, res) => {
    res.json(req.headers)
  })
}
module.exports = {
  addControllers
}
