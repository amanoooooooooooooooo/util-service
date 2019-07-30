import { NextApiRequest, NextApiResponse } from "next";
import { ResultUtil } from "../../Fetch";

const nodemailer = require('nodemailer')

const user = process.env.MAIL_USER || '1060996790@qq.com'
const pass = process.env.MAIL_PASS || '1'

var transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    secureConnection: true,
    port: 465,
    auth: { user, pass }
})

function sendMail(to: string, subject: string, text: string, html?: string) {
    var mailOptions = {
        from: `util.online<${user}>`,
        to,
        subject,
        text,
        html
    }
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error: Error, info: any) {
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



export default async function mail(req: NextApiRequest, res: NextApiResponse) {
    const { body } = req
    const { to, subject, text, html } = body
    if (!to || !subject) {
        res.json(ResultUtil.fail('参数错误'))
    }
    try {
        const result = await sendMail(to, subject, text, html)
        res.json(ResultUtil.success(result))
    } catch (e) {
        console.error('sendMail error ', e)
        res.json(ResultUtil.fail('发送失败'))
    }
}