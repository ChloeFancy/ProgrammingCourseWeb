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

export const searchClass = async (data) => {
  return request({
    data,
    ...api.SEARCH_CLASS,
  });
};

export const applyEnterClass = async (data) => {
  return request({
    data,
    ...api.APPLY_ENTER_CLASS,
  });
};

export const quitClass = async (data) => {
  return request({
    data,
    ...api.QUIT_CLASS,
  });
};

export const getMyClass = async (data) => {
  return request({
    data,
    ...api.GET_MY_CLASS,
  });
};

export const memberManage = async (data) => {
  return request({
    data,
    ...api.MANAGE_CLASS_MEMBER,
  });
};
