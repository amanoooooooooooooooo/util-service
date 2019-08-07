import { NextApiRequest, NextApiResponse } from "next";
import * as dao from '../../../server/dao'
import { ResultUtil } from "../../../Fetch";
import { mParseInt, mValue } from '../../../utils'
import { Level } from "../../../types";
import { LOCAL } from "../../../client/constant";


export default async function PhotoType(req: NextApiRequest, res: NextApiResponse) {
    const { type, pageSize, pageNum } = req.query

    const level = parseInt(req.cookies[LOCAL.MARK_LOGIN] || '0') as Level

    const types = dao.queryPhotoTypes(level)

    console.log('types', types);
    console.log('req.query', req.query);
    console.log('type', type, mValue(type));

    const photoType = types[mValue(type)].type
    const chapters = await dao.queryOssRows(photoType, mParseInt(pageSize), mParseInt(pageNum))
    res.json(ResultUtil.success(chapters))
}