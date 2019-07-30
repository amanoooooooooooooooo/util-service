const delay = (time: number) =>
  new Promise(resolve => setTimeout(() => resolve(true), time))

class ResultUtil {
  static send(errMsg: string | null, payload?: any) {
    return {
      errMsg,
      payload
    }
  }

  static success(payload: any) {
    return ResultUtil.send(null, payload)
  }
  static fail(errMsg = 'DEFAULT ERROR') {
    return ResultUtil.send(errMsg)
  }
}

exports.delay = delay
exports.ResultUtil = ResultUtil


export function mParseInt(x: string | string[]) {
  return x instanceof Array ? parseInt(x[0]) : parseInt(x)
}