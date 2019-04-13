import request from '../../lib/request';

export const fetchList = async (data) => {
  return request({ 
    url: '/getProblems', 
    data, 
    reqProto: 'GetProblemsReq', 
    resProto: 'GetProblemsResp', 
  });
};

export const getTagOptions = async () => {
  return request({
    url: '/conf',
    data: null,
    resProto: 'Config',
    method: 'get',
  });
};

export const getProblemById = async (data) => {
  return request({ 
    url: '/getProblemByID',
    data,
    reqProto: 'GetProblemByIDReq',
    resProto: 'GetProblemByIDResp',
  });
};
