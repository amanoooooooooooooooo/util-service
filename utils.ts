import { MAKR_LOGIN } from "./client/constant";
import { LocalUser } from "./types";


export function getUserStorage(): LocalUser {
  const userString = (typeof localStorage !== 'undefined') && localStorage.getItem(MAKR_LOGIN)
  let user = {}
  try {
    user = JSON.parse(userString as string) || {}
  } catch (error) {
    console.error('getUserStorage e', error)
  }
  return user
}
export function setUserStorage(user: LocalUser) {
  localStorage.setItem(MAKR_LOGIN, JSON.stringify(user))
}

export function mParseInt(x: string | string[]) {
  return x instanceof Array ? parseInt(x[0]) : parseInt(x)
}