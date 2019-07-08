import { MAKR_LOGIN } from '../client/constant'

export function getUserStorage () {
  const userString = (typeof localStorage !== 'undefined') && localStorage.getItem(MAKR_LOGIN)
  let user = {}
  try {
    user = JSON.parse(userString) || {}
  } catch (error) {
    console.error('getUserStorage e', error)
  }
  return user
}
export function setUserStorage (user) {
  localStorage.setItem(MAKR_LOGIN, JSON.stringify(user))
}
