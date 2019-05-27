import request from '../../lib/request';

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
    url: '/getMembers',
    data,
    reqProto: 'GetMemberReq',
    resProto: 'GetMemberResp',
  });
};

// todo
export const getRequestList = async (data) => {
  return {};
  // return request({
  //   url: '/getMembers',
  //   data,
  //   reqProto: 'GetMemberReq',
  //   resProto: 'GetMemberResp',
  // });
};
