import { NextApiRequest, NextApiResponse } from "next";
import { ResultUtil } from "../../Fetch";
import * as dao from '../../server/dao'
import { SERVER } from "../../client/constant";


export default async function Visit(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            const row = await dao.getValue(SERVER.VISIT_TOTAL)
            let response
            if (row) {
                const newValue = parseInt(row.value) + 1
                response = await dao.setValue(SERVER.VISIT_TOTAL, newValue.toString(), row.version + 1)
            } else {
                response = await dao.addValue(SERVER.VISIT_TOTAL, '1')
            }
            res.json(ResultUtil.success(response))
            break;
        default:
            res.json(ResultUtil.fail('invalid method'))
            break;
    }
}