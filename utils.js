const delay = time =>
  new Promise(resolve => setTimeout(() => resolve(true), time))

const randomPort = from => {
  const port = from + Math.round(Math.random() * 100)
  return port < 65535 ? port : randomPort(from)
}

module.exports = {
  delay,
  randomPort
}
