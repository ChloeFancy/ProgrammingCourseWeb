import request from '../../lib/request';
import api from '../../../config/api.config';

export const fetchList = async (data) => {
  return request({
    url: '/getUsers',
    data,
    reqProto: 'GetUsersReq',
    resProto: 'GetUsersResp',
  });
};

export const submitUserInfo = async (data) => {
  return request({
    url: '/updateUsers',
    data,
    reqProto: 'UpdateUsersReq',
    resProto: 'UpdateUsersResp',
  });
};

export const getUserRoleOptions = async () => {
  return request({
    url: '/userRole',
    method: 'get',
    data: null,
    resProto: 'UserRole',
  });
};

export const delUser = async (data) => {
  return request({
    data,
    ...api.DEL_USER,
  });
};


