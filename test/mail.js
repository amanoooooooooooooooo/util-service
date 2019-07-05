var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  secureConnection: true,
  port: 465,
  auth: {
    user: '1060996790@qq.com',
    pass: '你的授权码'
  }
})
// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'amanoooooooooooooooo@gmail.com',
//     pass: '你的密码'
//   }
// })

var mailOptions = {
  from: 'util.online<1060996790@qq.com>',
  to: '1741811265@qq.com',
  subject: '您订阅的<高手寂寞>更新拉',
  text: 'That was easy!',
  'html': "<h1>Welcome</h1><p>That was easy!</p><a href='http://www.baidu.com'>新的章节</a>"
}

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error)
  } else {
    console.log('Email sent: ' + info.response)
  }
})
