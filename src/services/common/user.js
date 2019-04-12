import request from '../../lib/request';

export const login = ({ account, password }) => {
    return request({
        url: '/login',
        data: { account, password },
        reqProto: 'LoginReq',
        resProto: 'LoginResp',
    });
}
