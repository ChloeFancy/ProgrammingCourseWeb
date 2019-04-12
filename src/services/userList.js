import request from '../lib/request';

export const fetchList = async () => {
  const data = {
    role: 1,
    get_all: true,
    page_index: 1,
    page_num: 10,
  };
  return request({
    url: '/getUsers', 
    data, 
    reqProto: 'GetUsersReq', 
    resProto: 'GetUsersResp', 
  });
};

// todo 需要getUserById
export const getUserInfoByID = async () => {
  const data = {
    role: 1,
    get_all: true,
    page_index: 1,
    page_num: 10,
  };
  return request({
    url: '/getUsers', 
    data, 
    reqProto: 'GetUsersReq', 
    resProto: 'GetUsersResp', 
  });
};

export const submitUserInfo = async () => {
  const data = {
    role: 1,
    get_all: true,
    page_index: 1,
    page_num: 10,
  };
  return request({
    url: '/getUsers', 
    data, 
    reqProto: 'GetUsersReq', 
    resProto: 'GetUsersResp', 
  });
};

// todo 需要getUserInfoByKeyword
export const getUserInfoByKeyword = async () => {
  const data = {
    role: 1,
    get_all: true,
    page_index: 1,
    page_num: 10,
  };
  return request({
    url: '/getUsers', 
    data, 
    reqProto: 'GetUsersReq', 
    resProto: 'GetUsersResp', 
  });
};


