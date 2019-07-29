import { NextApiRequest, NextApiResponse } from "next";
import * as dao from '../../server/dao'
import { ResultUtil } from "../../Fetch";


export default async function oss(req: NextApiRequest, res: NextApiResponse) {
    const { pageSize = '20', pageNum = '1' } = req.query

    //@ts-ignore
    const ossRows = await dao.queryOssRows('NOVEL', parseInt(pageSize), parseInt(pageNum))
    res.json(ResultUtil.success(ossRows))
}