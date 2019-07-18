
import fetch from 'isomorphic-unfetch'

const obj2urlParams = (obj) => {
  return Object.keys(obj).length === 0
    ? ''
    : Object.keys(obj)
      .filter(key => obj[key] !== undefined)
      .reduce((str, key) => `${str}${key}=${obj[key]}&`, '')
      .slice(0, -1)
      .replace(/^/, '?')
}

export default class Fetch {
  static get (url, option = {}) {
    return fetch(url + obj2urlParams(option)).then(res => res.json())
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
  static put (url, body) {
    const options = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    return fetch(url, options).then(res => res.json())
  }
}
