import { NextApiRequest, NextApiResponse } from "next";
import * as dao from '../../server/dao'
import { ResultUtil } from "../../Fetch";
import { UserRow } from "../../types";
import { MAIL_PATTERN } from "../../client/constant";
import { getPool } from "../../server/mysql";
const crypto = require('crypto')


function md5(string: string) {
    const hash = crypto.createHash('md5')
    hash.update(string)
    return hash.digest('hex')
}

export default async function Nove(req: NextApiRequest, res: NextApiResponse) {
    const { body } = req
    const { mail, nick, pass } = body
    switch (req.method) {
        case 'PUT':
            console.log('body2 ', body)
            if (!mail || !mail.trim()) {
                res.json(ResultUtil.fail('请输入邮箱'))
            } else if (!nick || !nick.trim()) {
                res.json(ResultUtil.fail('请输入昵称'))
            } else if (!pass || !pass.trim()) {
                res.json(ResultUtil.fail('请输入密码'))
            } else if (!MAIL_PATTERN.test(mail)) {
                res.json(ResultUtil.fail('邮箱格式不正确'))
            } else {
                const pool = await getPool()
                const userRows: UserRow[] = await dao.queryUserWithOption(pool, mail)
                const userRow = userRows[0]
                if (userRows.length === 0) {
                    const result = await dao.insertUser(pool, { nick, mail, pass: md5(pass) })
                    console.log('result ', result)
                    res.json(ResultUtil.success({ id: result.insertId, mail, nick }))
                } else {
                    if (!userRow.pass) {
                        await dao.updateUser({ nick, pass: md5(pass) }, userRow.id)
                        res.json(ResultUtil.success({ id: userRow.id, mail, nick }))
                    } else {
                        if (md5(pass) === userRow.pass) {
                            await dao.updateUser({ nick }, userRow.id)
                            res.json(ResultUtil.success({ id: userRow.id, mail, nick }))
                        } else {
                            res.json(ResultUtil.fail('密码不一致'))
                        }
                    }
                }
            }
            break;
        case 'POST':
            if (!mail || !mail.trim()) {
                res.json(ResultUtil.fail('请输入邮箱'))
            } else if (!nick || !nick.trim()) {
                res.json(ResultUtil.fail('请输入昵称'))
            } else if (!pass || !pass.trim()) {
                res.json(ResultUtil.fail('请输入密码'))
            } else if (!MAIL_PATTERN.test(mail)) {
                res.json(ResultUtil.fail('邮箱格式不正确'))
            } else {
                const pool = await getPool()
                const userRows = await dao.queryUserWithOption(pool, mail)
                if (userRows.length === 0) {
                    const result = await dao.insertUser(pool, { nick, mail, pass: md5(pass) })
                    console.log('result ', result)
                    res.json(ResultUtil.success({ id: result.insertId, mail, nick }))
                } else {
                    res.json(ResultUtil.fail('已存在'))
                }
            }
            break
        default:
            res.json(ResultUtil.fail())
            break;
    }

}