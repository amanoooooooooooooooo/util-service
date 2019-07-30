import { NextApiRequest, NextApiResponse } from "next";
import * as dao from '../../../server/dao'
import { ResultUtil } from "../../../Fetch";
import { mParseInt } from '../../../utils'



export default async function NoveId(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query
    const chapters = await dao.queryNovelChapters(mParseInt(id))
    res.json(ResultUtil.success(chapters))
}