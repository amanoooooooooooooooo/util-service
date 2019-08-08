// import fetch from 'isomorphic-unfetch'
import * as fetchImport from 'isomorphic-unfetch'
const fetch = (fetchImport.default || fetchImport) as typeof fetchImport.default

const obj2urlParams = (obj: any = {}): string => {
    return Object.keys(obj).length === 0
        ? ''
        : Object.keys(obj)
            .filter(key => obj[key] !== undefined)
            .reduce((str, key) => `${str}${key}=${obj[key]}&`, '')
            .slice(0, -1)
            .replace(/^/, '?')
}

function commonHeaders(): HeadersInit {
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

type Request = RequestInit

async function filter200Status(r: Response) {
    if (r.status !== 200) {
        const text = await r.text()
        return Promise.reject(`${r.url} error status ${r.status} ${r.statusText} ${text}`)
        // throw new Error(`${r.url} error status ${r.status} ${r.statusText} ${text}`);
    }
    return r.json()
}
export default class Fetch {
    static headers = commonHeaders()
    static credentials: RequestCredentials = 'omit'
    static debug: boolean = true

    public static async get(url: string, params: Object = {}): Promise<any> {
        const completeUrl = url + obj2urlParams(params)

        const options = { credentials: this.credentials }
        const result = await this.fetch(completeUrl, options)

        return result
    }
    public static async post(url: string, body: any = {}): Promise<any> {
        this.debug && console.debug('__post__:', url)

        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: this.headers,
            credentials: this.credentials
        }
        const result = await this.fetch(url, options)

        return result
    }
    public static async put(url: string, body: Object = {}): Promise<any> {
        const options = {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(body),
            credentials: this.credentials
        }
        const result = await this.fetch(url, options)

        return result
    }
    public static async delete(url: string, body: Object = {}): Promise<any> {

        const options = {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify(body),
            credentials: this.credentials
        }
        const result = await this.fetch(url, options)

        return result
    }

    public static async fetch(url: string, options: RequestInit) {
        const start = new Date()

        const mark = `__${(options.method || 'GET').toLowerCase()}__`
        this.debug && console.debug('%s: %s', mark, url)

        const result = await fetch(url, options)
            .then(filter200Status)
            .catch(e => {
                console.error('%c %s:%s Error Cost %f ms', Color.red, mark, url, cost(start), e)
                throw e
            })
        this.debug && console.debug('%c %s: %s Success Cost %f ms res: %o', Color.blue, mark, url, cost(start), result)
        return result
    }
}


