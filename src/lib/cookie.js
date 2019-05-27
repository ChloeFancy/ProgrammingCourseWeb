export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export const setCookie = (name, value, expires) => {
  deleteCookie(name);
  // cookie在不同路径下共享
  document.cookie = `${name}=${value};expires=${expires};path=/`;
};

export const getCookie = (name) => {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  const result = document.cookie.match(reg);
  if (result) return result[2];
  return null;
};
