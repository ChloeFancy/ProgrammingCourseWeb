import request from '../../lib/request';
import api from '../../../config/api.config';

export const login = ({ account, password }) => {
    return request({
        ...api.LOGIN,
        data: { account, password },
    });
};


export const logout = () => {
    return request({
        ...api.LOGOUT,
        data: null,
    });
}

export const register = (data) => {
    return request({
      ...api.REGISTER,
        data,
    });
};
