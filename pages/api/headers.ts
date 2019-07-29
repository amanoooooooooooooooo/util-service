import { NextApiRequest, NextApiResponse } from "next";


export default function headers(req: NextApiRequest, res: NextApiResponse) {
    res.json(req.headers)
}