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
  return parseInt(mValue(x))
}
export function mValue(x: string | string[]) {
  return x instanceof Array ? x[0] : x
}

export function getCookie(name: string) {
  const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  const arr = document.cookie.match(reg)
  console.log('arr', arr);

  if (arr)
    return unescape(arr[2]);
  else
    return null;
}

export function delCookie(name: string, path?: string) {
  const cval = getCookie(name);

  console.log('getCookie %s cval', name, cval);
  console.log('path ', path);


  if (cval != null)
    document.cookie = `${generateCookie({ [name]: escape(cval), expires: getExpire('s-1'), path })}`
}

const generateCookie = (obj: any = {}): string => {
  return Object.keys(obj).length === 0
    ? ''
    : Object.keys(obj)
      .filter(key => obj[key] !== undefined)
      .reduce((str, key) => `${str}${key}=${obj[key]};`, '')
      .slice(0, -1)
}

export function buildCookie(name: string, value: string, interval?: string, path?: string) {
  return `${generateCookie({ [name]: escape(value), expires: getExpire(interval), path })}`
}
export function setCookie(name: string, value: string, interval?: string, path?: string) {
  document.cookie = `${generateCookie({ [name]: escape(value), expires: getExpire(interval), path })}`
}
// m1 =>  60 * 1000
function getsec(str: string): number {
  var amount = parseInt(str.substring(1, str.length));
  var unit = str.substring(0, 1);

  switch (unit) {
    case 's':
      return amount * 1000
    case 'm':
      return amount * 60 * 1000
    case 'h':
      return amount * 60 * 60 * 1000
    case 'd':
      return 24 * 60 * 60 * 1000
    default:
      throw new Error('invalid unit')
  }
}
function getExpire(interval?: string) {
  if (!interval) return undefined
  const exp = new Date();
  console.log('exp', exp);
  console.log('getsec(interval)', getsec(interval));

  exp.setTime(exp.getTime() + getsec(interval));
  console.log('exp2', exp);
  return exp.toUTCString()
}

