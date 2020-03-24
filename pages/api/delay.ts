import { NextApiRequest, NextApiResponse } from "next";

function delay(timeout = 1000) {
    return new Promise(resolve => setTimeout(() => {
        resolve(1)
    }, timeout))
}


export default async function headers(req: NextApiRequest, res: NextApiResponse) {
    const { t } = req.query
    await delay(parseInt(t as string))
    res.json('OK')
}