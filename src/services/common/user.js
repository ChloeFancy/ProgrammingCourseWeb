import request from '../../lib/request';

export const login = ({ account, password }) => {
    return request({
        url: '/login',
        data: { account, password },
        reqProto: 'LoginReq',
        resProto: 'LoginResp',
    });
}


export const logout = () => {
    return request({
        url: '/logout',
        data: null,
        method: 'get',
        resProto: 'LogoutResp',
    });
}

export const register = (data) => {
    return request({
        url: '/register',
        data,
        reqProto: 'RegisterReq',
        resProto: 'RegisterResp',
    });
}