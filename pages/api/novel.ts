import { NextApiRequest, NextApiResponse } from "next";


export default function novel(req: NextApiRequest, res: NextApiResponse) {
    res.json(req.headers)
}