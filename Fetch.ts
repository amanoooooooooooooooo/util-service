import fetch from 'isomorphic-unfetch'

console.debug = () => { }

export interface Result<T> {
    errMsg: string | null
    payload: T
}

export class ResultUtil {
    static send(errMsg: string | null, payload?: any) {
        return {
            errMsg,
            payload
        }
    }

    static success(payload?: any) {
        return ResultUtil.send(null, payload)
    }
    static fail(errMsg = 'DEFAULT ERROR') {
        return ResultUtil.send(errMsg)
    }
}

const obj2urlParams = (obj: any): string => {
    return Object.keys(obj).length === 0
        ? ''
        : Object.keys(obj)
            .filter(key => obj[key] !== undefined)
            .reduce((str, key) => `${str}${key}=${obj[key]}&`, '')
            .slice(0, -1)
            .replace(/^/, '?')
}


function commonHeaders(): any {
    return {
        'content-type': 'application/json',
    }
}
function cost(startTime: Date) {
    return (new Date().getTime() - startTime.getTime()) / 1000
}
enum Color {
    blue = 'color:blue',
    red = 'color:red'
}
async function filter200Status(r: Response) {
    if (r.status !== 200) {
        const text = await r.text()
        return Promise.reject(`${r.url} error status ${r.status} ${r.statusText} ${text}`)
        // throw new Error(`${r.url} error status ${r.status} ${r.statusText} ${text}`);
    }
    return r.json()
}
export default class Fetch {
    public static async get(url: string, option: any = {}): Promise<any> {
        const start = new Date()
        const completeUrl = url + obj2urlParams(option)

        console.debug('__get__:', completeUrl)

        const result = await fetch(completeUrl)
            .then(filter200Status)
            .catch(e => {
                console.error('%c __get__:%s Error Cost %f ms', Color.red, completeUrl, cost(start), e)
                throw e
            })
        console.debug('%c __get__: %s Success Cost %f ms res: %o', Color.blue, completeUrl, cost(start), result)

        return result
    }
    public static async post(url: string, body: any = {}): Promise<any> {
        const start = new Date()
        console.debug('__post__:', url)

        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: commonHeaders(),
        }
        const result = await fetch(url, options)
            .then(filter200Status)
            .catch(e => {
                console.error('%c __post__:%s Error Cost %f ms', Color.red, url, cost(start), e)
                throw e
            })
        console.debug('%c __post__: %s Success Cost %f ms res: %o', Color.blue, url, cost(start), result)

        return result
    }
    public static async put(url: string, body: any = {}): Promise<any> {
        const start = new Date()
        console.debug('__put__:', url)

        const options = {
            method: 'PUT',
            headers: commonHeaders(),
            body: JSON.stringify(body)
        }
        const result = await fetch(url, options)
            .then(filter200Status)
            .catch(e => {
                console.error('%c __put__:%s Error Cost %f ms', Color.red, url, cost(start), e)
                throw e
            })
        console.debug('%c __put__: %s Success Cost %f ms res: %o', Color.blue, url, cost(start), result)

        return result
    }
}
