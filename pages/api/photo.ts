import { NextApiRequest, NextApiResponse } from "next";
import * as dao from '../../server/dao'
import { ResultUtil } from "../../Fetch";
import { Level } from "../../types";


export default async function Photo(req: NextApiRequest, res: NextApiResponse) {
    const level = parseInt(req.cookies.vip || '0') as Level
    console.log('level', level);

    res.json(ResultUtil.success(dao.queryPhotoTypes(level)))
}

