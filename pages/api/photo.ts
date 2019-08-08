import { NextApiRequest, NextApiResponse } from "next";
import * as dao from '../../server/dao'
import { ResultUtil } from "../../Fetch";
import { Level } from "../../types";
import { LOCAL } from "../../client/constant";


export default async function Photo(req: NextApiRequest, res: NextApiResponse) {
    const level = parseInt(req.cookies[LOCAL.MARK_LOGIN] || '0') as Level
    console.log('level', level);
    console.log('developer', req.cookies[LOCAL.MODE_DEV]);
    const developer = req.cookies[LOCAL.MODE_DEV]
    res.json(ResultUtil.success(dao.queryPhotoTypes(developer ? level : 0)))
}

