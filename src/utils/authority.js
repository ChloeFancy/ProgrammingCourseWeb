import { setCookie, getCookie } from '../lib/cookie';

const TOKEN = 'token';
const USER_INFO = 'userInfo';
// 加密
const compile = (code) => {
  let c = String.fromCharCode(code.charCodeAt(0)+code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
  }
  return c;
};

// 解密
const uncompile = (code) => {
  let c = String.fromCharCode(code.charCodeAt(0)-code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));
  }
  return c;
};

export const getCurrentUser = () => {
  const currentUser = getCookie(USER_INFO);
  return currentUser ? JSON.parse(uncompile(currentUser)) : {};
};

export function getAuthority() {
  return Number(getCurrentUser().role);
}

export function setAuthority(token, user) {
  setCookie(TOKEN, token);
  setCookie(USER_INFO, compile(JSON.stringify(user)));
}
