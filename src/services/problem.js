import request from '../lib/request';

export const fetchList = async () => {
  // TODO 删除mock数据
  const data = {
    tag: 1,
    get_all: true,
    page_index: 1,
    page_num: 10,
  };
  return request({ 
    url: '/getProblems', 
    data, 
    reqProto: 'GetProblemsReq', 
    resProto: 'GetProblemsResp', 
  });
};
