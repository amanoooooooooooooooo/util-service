const delay = time =>
  new Promise(resolve => setTimeout(() => resolve(true), time))

class ResultUtil {
  static send (errMsg, payload) {
    return {
      errMsg,
      payload
    }
  }

  static success (payload) {
    return ResultUtil.send(null, payload)
  }
  static fail (payload) {
    return ResultUtil.send('default error', payload)
  }
}

exports.delay = delay
exports.ResultUtil = ResultUtil
