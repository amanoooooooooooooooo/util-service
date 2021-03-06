import { NextApiRequest, NextApiResponse } from "next";
import * as dao from '../../server/dao'
import { ResultUtil } from "../../Fetch";
import { getPool } from "../../server/mysql";
import { UserRow } from "../../types";


export default async function oss(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case 'DELETE':
            const { id } = req.body
            const result = await dao.deleteRss(id)
            res.json(ResultUtil.success(result))
            break;
        case 'POST':
            const { mail, nick, id: ossId } = req.body
            const userRow = {
                mail,
                nick
            } as UserRow

            console.log('userRow', userRow)

            const pool = await getPool()
            const conn = await pool.getConnection()
            // console.log('got conn %o', conn)
            await conn.beginTransaction()

            try {
                const rows = await dao.queryUserWithOption(conn, mail)
                let userId: number = -1

                if (rows.length === 0) {
                    const res = await dao.insertUser(conn, userRow)
                    console.log('insertUser is ', res)
                    userId = res.insertId
                } else {
                    userId = rows[0].id
                }
                console.log('userId ', userId)
                console.log('ossId ', ossId)

                const rssRow = {
                    user_id: userId,
                    oss_id: ossId
                }
                const rssResults = await dao.queryRssRows(conn, userId, ossId)
                if (rssResults.length > 0) {
                    res.json(ResultUtil.fail('已订阅'))
                } else {
                    await dao.insertRss(conn, rssRow)
                    await conn.commit()
                    res.json(ResultUtil.success())
                }
            } catch (e) {
                console.error('spider/api/sub e', e)
                await conn.rollback()
                res.json(ResultUtil.fail(e))
            } finally {
                conn.release()
            }
            break

        default:
            res.json(ResultUtil.fail('default '))
            break;
    }
}