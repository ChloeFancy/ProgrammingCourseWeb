import request from '../../lib/request';

export const fetchList = async (data) => {
  return request({ 
    url: '/getProblems', 
    data, 
    reqProto: 'GetProblemsReq', 
    resProto: 'GetProblemsResp', 
  });
};

export const getOptions = async () => {
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


// todo 
export const submitCodeByStudent = async (data) => {
  return request({
    url: '/conf',
    data: null,
    resProto: 'Config',
    method: 'get',
  });
};

export const getLanguageOptions = async () => {
  return request({
    url: '/getAllLanguage',
    data: null,
    resProto: 'JudgeLanguage',
    method: 'get',
  });
};

export const getSubmitRecords = async (data) => {
  return request({
    url: '/submitRecord',
    data,
    reqProto: 'GetSubmitRecordReq',
    resProto: 'GetSubmitRecordResp',
  });
};