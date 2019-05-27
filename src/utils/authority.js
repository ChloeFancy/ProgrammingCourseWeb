import { setCookie, getCookie } from '../lib/cookie';

const authCookie = 'userRole';
const TOKEN = 'token';
const NAME = 'name';

export function getAuthority() {
  return Number(getCookie(authCookie));
}

export function setAuthority(authority, token, name) {
  setCookie(authCookie, authority);
  setCookie(TOKEN, token);
  setCookie(NAME, name);
}
