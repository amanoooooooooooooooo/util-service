import { NextApiRequest, NextApiResponse } from "next";
import * as dao from '../../server/dao'
import { ResultUtil } from "../../Fetch";
import { mParseInt } from '../../utils'
import { OssRow } from "../../types";


export default async function Nove(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            const { body } = req
            const { name, crawlUrl } = body
            console.log('name %s, crawlurl %s', name, crawlUrl)
            const ossRow: OssRow = {
                name,
                type: 'NOVEL',
                crawl_url: crawlUrl
            }
            const rows = await dao.queryOssWithOption(name, crawlUrl)
            if (rows.length > 0) {
                res.json(ResultUtil.fail('已存在'))
            } else {
                const result = await dao.insertOss(ossRow)
                res.json(ResultUtil.success(result))
            }
            break;
        default:
            res.json(ResultUtil.fail())
            break;
    }

}