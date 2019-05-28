import request from '../../lib/request';
import api from '../../../config/api.config';

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

export const generatePaper = async (data) => {
  return request({
    data,
    ...api.GENERATE_PAPER,
  });
};

export const modifyPaper = async (data) => {
  return request({
    data,
    ...api.MODIFY_PAPER,
  });
};

export const getAlgorithm = async () => {
  return request({
    ...api.GET_ALGORITHM,
  });
};


