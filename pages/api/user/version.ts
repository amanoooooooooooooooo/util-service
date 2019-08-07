import { NextApiRequest, NextApiResponse } from "next";
import { ResultUtil } from "../../../Fetch";
import { buildCookie } from '../../../utils'
import { LOCAL } from "../../../client/constant";

export default async function Version(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            res.setHeader("Set-Cookie", buildCookie(LOCAL.MARK_LOGIN, '1', undefined, '/'))
            res.json(ResultUtil.success())
            break;
        default:
            res.json(ResultUtil.fail('empty user id'))
            break;
    }
}