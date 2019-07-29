import { NextApiRequest, NextApiResponse } from "next";
import Core from '@alicloud/pop-core';

const SECERT_ID = process.env.SECERT_ID || ''
const SECERT_KEY = process.env.SECERT_KEY || ''
console.log('SECERT_ID is %s, SECERT_KEY is %s', SECERT_ID, SECERT_KEY)

const Client = (secretId?: string, secertKey?: string) => new Core({
    accessKeyId: secretId || SECERT_ID,
    accessKeySecret: secertKey || SECERT_KEY,
    endpoint: 'https://alidns.aliyuncs.com',
    apiVersion: '2015-01-09'
})

export default async function dns(req: NextApiRequest, _: NextApiResponse) {
    // @ts-ignore
    const { secretId, secertKey, domainName = 'util.online', RR, type = 'A', value } = body || {}

    const requestParams = {
        DomainName: 'util.online'
    }
    const client = Client(secretId, secertKey)
    const requestOption = {
        method: 'POST'
    }
    switch (req.method) {
        case 'GET':
            return client.request('DescribeDomainRecords', requestParams, requestOption)
        case 'POST': {
            const requestParams = {
                DomainName: domainName, // util.online
                RR: RR, // lin2heart
                Type: type, // A | NS | MX | TXT | CNAME | SRV | AAAA | CAA | REDIRECT_URL | FORWARD_URL refre to https://help.aliyun.com/document_detail/29805.html?spm=a2c4g.11186623.2.20.118a2846NGdMrE
                Value: value // 10.10.1.214
            }
            return client.request('AddDomainRecord', requestParams, requestOption)
        }
        case 'DELETE':
            return client.request('DeleteDomainRecord', requestParams, requestOption)
        default:
            break;
    }


}