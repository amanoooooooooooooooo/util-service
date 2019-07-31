import { NextApiRequest, NextApiResponse } from "next";
import * as dao from '../../../server/dao'
import { ResultUtil } from "../../../Fetch";
import { mParseInt, mValue } from '../../../utils'


export default async function PhotoType(req: NextApiRequest, res: NextApiResponse) {
    const { type, pageSize, pageNum } = req.query
    const { cookies } = req

    console.log('cookies', cookies);

    const chapters = await dao.queryOssRows(mValue(type), mParseInt(pageSize), mParseInt(pageNum))
    res.json(ResultUtil.success(chapters))
}