function handle(req, res) {
  res.end('test')
}

handle.GET = function (req, res) {
  res.json('get')
}
export default handle