const fetch = require('isomorphic-unfetch')

async function main () {
  var index = 1
  for (index; index < 20000; index++) {
    const res = await fetch('http://localhost:8888/1024px-Bitcoin.svg.png').then(res => res.blob())
    console.log('res is ', res.size, index)
  }
}

main()
