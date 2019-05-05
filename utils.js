const delay = time =>
  new Promise(resolve => setTimeout(() => resolve(true), time))

exports.delay = delay
