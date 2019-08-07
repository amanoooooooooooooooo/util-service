import { NextApiRequest, NextApiResponse } from "next";
import * as dao from '../../../server/dao'
import { ResultUtil } from "../../../Fetch";
import { mParseInt, buildCookie } from '../../../utils'
import { LOCAL } from "../../../client/constant";

export default async function UserId(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            const { id } = req.query
            console.log('id ', id)
            const results = await dao.queryOssInRss(mParseInt(id))
            console.log('queryOssInRss  results', results)

            res.setHeader("Set-Cookie", buildCookie(LOCAL.MARK_LOGIN, '1', undefined, '/'))
            res.json(ResultUtil.success(results))
            break;
        default:
            res.json(ResultUtil.fail())
            break;
    }

}