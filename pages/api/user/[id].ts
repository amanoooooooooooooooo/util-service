import { NextApiRequest, NextApiResponse } from "next";
import * as dao from '../../../server/dao'
import { ResultUtil } from "../../../Fetch";
import { mParseInt } from '../../../utils'
import { OssRow, UserRow } from "../../../types";
import { MAIL_PATTERN } from "../../../client/constant";
import { getPool } from "../../../server/mysql";
const crypto = require('crypto')


function md5(string: string) {
    const hash = crypto.createHash('md5')
    hash.update(string)
    return hash.digest('hex')
}

export default async function UserId(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            const { id } = req.query
            console.log('id ', id)
            const results = await dao.queryOssInRss(mParseInt(id))
            console.log('queryOssInRss  results', results)

            res.json(ResultUtil.success(results))
            break;
        default:
            res.json(ResultUtil.fail())
            break;
    }

}