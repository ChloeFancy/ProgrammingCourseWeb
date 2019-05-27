import { setCookie, getCookie } from '../lib/cookie';

// use localStorage to store the authority info, which might be sent from server in actual project.
const authCookie = 'userRole';

export function getAuthority() {
  return Number(getCookie(authCookie));
}

export function setAuthority(authority) {
  // const proAuthority = typeof authority === 'string' ? [authority] : authority;
  setCookie(authCookie, authority);
  // return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}
