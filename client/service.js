
import fetch from 'isomorphic-unfetch'

export default class Fetch {
  static get (url) {
    return fetch.get(url).then(res => res.json)
  }
  static post (url, body) {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    return fetch(url, options).then(res => res.json())
  }
}
