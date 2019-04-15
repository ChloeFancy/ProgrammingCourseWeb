import request from '../../lib/request';

export const fetchList = async (data) => {
  return request({
    url: '/getMatches',
    data,
    reqProto: 'GetMatchesReq',
    resProto: 'GetMatchesResp',
  });
};

export const getAllOptions = async () => {
  return request({
    url: '/conf',
    data: null,
    resProto: 'Config',
    method: 'get',
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
