import { NextApiRequest, NextApiResponse } from "next";
import * as dao from '../../../server/dao'
import { ResultUtil } from "../../../Fetch";
import { buildCookie } from '../../../utils'
import { MAIL_PATTERN } from "../../../client/constant";
import { getPool } from "../../../server/mysql";
const crypto = require('crypto')


function md5(string: string) {
    const hash = crypto.createHash('md5')
    hash.update(string)
    return hash.digest('hex')
}

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'PUT':
            const { mail, pass } = req.body
            if (!mail || !mail.trim()) {
                res.json(ResultUtil.fail('请输入邮箱'))
            } else if (!pass || !pass.trim()) {
                res.json(ResultUtil.fail('请输入密码'))
            } else if (!MAIL_PATTERN.test(mail)) {
                res.json(ResultUtil.fail('邮箱格式不正确'))
            } else {
                const pool = await getPool()
                const userRows = await dao.queryUserWithOption(pool, mail)
                if (userRows.length === 0) {
                    res.json(ResultUtil.fail('用户不存在'))
                } else {
                    const userRow = userRows[0]
                    if (md5(pass) === userRow.pass) {
                        res.setHeader("Set-Cookie", buildCookie('vip', '1', undefined, '/'))
                        res.json(ResultUtil.success({ id: userRow.id, mail, nick: userRow.nick }))
                    } else {
                        res.json(ResultUtil.fail('密码不一致'))
                    }
                }
            }
            break;
        default:
            res.json(ResultUtil.fail())
            break;
    }

}