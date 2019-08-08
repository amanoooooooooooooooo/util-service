async function startServer () {
    var express = require('express')
    var bodyParser = require('body-parser')
    var auth = require('basic-auth')

    var app = express()
    app.use(bodyParser.json())

    app.get('/', function (req, res) {
        res.json({ get: 1 })
    })
    app.post('/', function (req, res) {
        res.json({ post: 1 })
    })
    app.post('/auth', function (req, res) {
        var user = auth(req)
        const { method, path, headers } = req
        console.log('user', user);
        if (user && user.name === 'a' && user.pass === 'b') {
            res.json(user)
        } else {
            res.statusCode = 401
            res.setHeader('WWW-Authenticate', 'Basic realm="test"')
            res.end('Unauthorized')
        }
    })

    app.listen(8000)
}

startServer()