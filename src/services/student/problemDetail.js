import request from '../../lib/request';

// todo 获取题目详情
export const getProblemDetail = async () => {
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

// todo 获取题目提交记录
export const getProblemLogs = async () => {
   // TODO 删除mock数据
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
