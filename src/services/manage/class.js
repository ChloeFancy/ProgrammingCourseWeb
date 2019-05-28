import request from '../../lib/request';
import api from '../../../config/api.config';

export const fetchList = async(data) => {
    return request({
        url: '/getClasses',
        data,
        reqProto: 'GetClassesReq',
        resProto: 'GetClassesResp',
      });
};

export const getClassByID = async (data) => {
  return request({
    url: '/getClassByID',
    data,
    reqProto: 'GetClassByIDReq',
    resProto: 'GetClassByIDResp',
  });
};

export const editClass = async (data) => {
  return request({
    url: '/editClass',
    data,
    reqProto: 'EditClassReq',
    resProto: 'EditClassResp',
  });
};

export const addClass = async (data) => {
  return request({
    url: '/addClass',
    data,
    reqProto: 'AddClassReq',
    resProto: 'AddClassResp',
  });
};

export const getClassMemberList = async (data) => {
  return request({
    url: '/getMember',
    data,
    reqProto: 'GetMemberReq',
    resProto: 'GetMemberResp',
  });
};

export const getRequestList = async (data) => {
  return request({
    data,
    ...api.GET_CLASS_REQUESTS,
  });
};

export const replyRequest = async (data) => {
  return request({
    data,
    ...api.REPLY_ENTER_REQUEST,
  });
};
