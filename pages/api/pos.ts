import { NextApiRequest, NextApiResponse } from "next";
import { ResultUtil } from "../../Fetch";


export default async function Photo(req: NextApiRequest, res: NextApiResponse) {
    console.log('req.query', req.query)
    res.json(ResultUtil.success({ longitude: 101, latitude: 102 }))
}

