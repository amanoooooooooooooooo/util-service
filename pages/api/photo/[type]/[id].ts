import { NextApiRequest, NextApiResponse } from "next";
import * as dao from '../../../../server/dao'
import { ResultUtil } from "../../../../Fetch";
import { mParseInt } from '../../../../utils'


export default async function PhotoType(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query
    const results = await dao.queryPhotoRows(mParseInt(id))
    res.json(ResultUtil.success(results))
}