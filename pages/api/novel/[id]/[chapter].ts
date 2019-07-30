import { NextApiRequest, NextApiResponse } from "next";
import * as dao from '../../../../server/dao'
import { ResultUtil } from "../../../../Fetch";
import { mParseInt } from '../../../../utils'



export default async function Chapter(req: NextApiRequest, res: NextApiResponse) {
    const { chapter, id } = req.query

    const novelRows = await dao.queryNovelRow(mParseInt(id), mParseInt(chapter))
    switch (novelRows.length) {
        case 0:
            res.json(ResultUtil.fail('NOT EXIST'))
            break
        case 1:
            const novelObj = novelRows[0]
            novelObj.content = novelObj.content.toString()
            res.json(ResultUtil.success(novelRows[0]))
            break
        default:
            throw new Error('Chapter error')
    }
}