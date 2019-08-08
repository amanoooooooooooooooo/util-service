const fetch = require('./index.js').default


async function get () {
    fetch.debug = false
    const res = await fetch.get('http://localhost:8000')
    console.log('get res ', res);
}
async function post () {
    // fetch.debug = false
    const res = await fetch.post('http://localhost:8000')
    console.log('get post ', res);
}
async function postWithAuth () {
    const headers = {
        'content-type': 'application/json',
        Authorization: 'Basic YTpi'
    }
    // fetch.debug = false
    fetch.headers = headers
    const res = await fetch.post('http://localhost:8000/auth')
    console.log('get post ', res);
}
async function main () {
    get()
    post()
    postWithAuth()
}


main()