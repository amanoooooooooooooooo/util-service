var express = require('express');
var app = express();


const delay = time =>
  new Promise(resolve => setTimeout(() => resolve(true), time));


app.get('/', async function (req, res) {
  console.log('req.headers', req.headers)
  res.status(300).json(req.headers);
});
app.post('/post', function (req, res) {
  console.log('req is ', req)
  res.json('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});