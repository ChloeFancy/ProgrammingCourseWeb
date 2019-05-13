import { setCookie, getCookie } from '../lib/cookie';

// use localStorage to store the authority info, which might be sent from server in actual project.
const authCookie = 'userRole';

export function getAuthority() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  // const authorityString =
  //   typeof str === 'undefined' ? localStorage.getItem('antd-pro-authority') : str;
  // const authorityString =
  //   typeof str === 'undefined' ? Number(getCookie(authCookie)) : str;
  // authorityString could be admin, "admin", ["admin"]
  // let authority;
  // try {
  //   authority = JSON.parse(authorityString);
  // } catch (e) {
  //   authority = authorityString;
  // }
  // if (typeof authority === 'string') {
  //   return [authority];
  // }
  // if (!authority && NODE_ENV !== 'production') {
  //   return ['admin'];
  // }
  return Number(getCookie(authCookie));
}

export function setAuthority(authority) {
  // const proAuthority = typeof authority === 'string' ? [authority] : authority;
  setCookie(authCookie, authority);
  // return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}
