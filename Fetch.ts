import fetch from 'isomorphic-unfetch'

if (process.env.NODE_ENV === 'production') {
    console.debug = () => { }
}

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
