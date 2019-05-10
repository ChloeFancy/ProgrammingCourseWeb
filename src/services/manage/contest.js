import request from '../../lib/request';

export const fetchList = async (data) => {
  return request({
    url: '/getMatches',
    data,
    reqProto: 'GetMatchesReq',
    resProto: 'GetMatchesResp',
  });
};

export const getMatchByID = async (data) => {
  return request({
    url: '/getMatchByID',
    data,
    reqProto: 'GetMatchByIDReq',
    resProto: 'GetMatchByIDResp',
  });
};

export const getPaperByID = async (data) => {
  return request({
    url: '/getPaperByID',
    data,
    reqProto: 'GetPaperByIDReq',
    resProto: 'GetPaperByIDResp',
  });
};


export const editContest = async (data) => {
  return request({
    url: '/editMatch',
    data,
    reqProto: 'EditMatchReq',
    resProto: 'EditMatchResp',
  });
};

export const addContest = async (data) => {
  return request({
    url: '/newMatch',
    data,
    reqProto: 'NewMatchReq',
    resProto: 'NewMatchResp',
  });
};

// todo 生成试卷接口
export const generatePaper = async (data) => {
  console.log('生成试卷', data);
  return {};
};

// todo 删除试卷题目
export const deleteProblemFromPaper = async (data) => {
  console.log('删除题目', data);
  return { isSuccess: true };
};


