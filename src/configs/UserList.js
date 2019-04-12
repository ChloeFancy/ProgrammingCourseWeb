export default {
    ID: 'id',
    account: 'account', // 登录名
    registerTime: 'create',
    lastLoginTime: 'lastLogin',
    name: 'name', // 真实姓名
    email: 'email',
    type: 'role',
    password: 'password',
};

export const userTypeOptions = [
    {
        key: '一般用户',
        value: 0,
    },
    {
        key: '管理员',
        value: 1,
    },
    {
        key: '超级管理员',
        value: 2,
    },
];

export const searchFormDataConfig = {
    role: 'role',
    keyword: 'keyword',
};
