import { NextApiRequest, NextApiResponse } from "next";
import * as dao from '../../../server/dao'
import { ResultUtil } from "../../../Fetch";
import { mParseInt } from '../../../utils'


export default async function NoveId(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            const { id } = req.query
            const chapters = await dao.queryNovelChapters(mParseInt(id))
            res.json(ResultUtil.success(chapters))
            break;
        default:
            res.json(ResultUtil.fail())
            break;
    }

}