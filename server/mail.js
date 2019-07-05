var nodemailer = require('nodemailer')

const user = process.env.MAIL_USER || 'amanoooooooooooooooo@gmail.com'
const pass = process.env.MAIL_PASS || '1'

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user, pass }
})

function sendMail (to, subject, text, html) {
  var mailOptions = {
    from: 'util.online',
    to,
    subject,
    text,
    html
  }
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        console.log('Email sent: ' + info.response)
        resolve('Email sent: ' + info.response)
      }
    })
  })
}
exports.sendMail = sendMail
