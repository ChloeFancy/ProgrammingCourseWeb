/* eslint-disable import/no-mutable-exports */
let CURRENT = 'NULL';
/**
 * use  authority or getAuthority
 * @param {string|()=>String} currentAuthority
 */
const renderAuthorize = Authorized => currentAuthority => {
  CURRENT = currentAuthority;
  return Authorized;
};

export { CURRENT };
export default Authorized => renderAuthorize(Authorized);
// 此处传参是Authorized函数
