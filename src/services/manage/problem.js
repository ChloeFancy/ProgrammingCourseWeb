import request from '../../lib/request';
import { async } from 'q';

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

export const editProblem = async (data) => {
  return request({ 
    url: '/editProblem',
    data,
    reqProto: 'EditProblemReq',
    resProto: 'EditProblemResp',
  });
};

export const addProblem = async (data) => {
  return request({ 
    url: '/addProblem',
    data,
    reqProto: 'AddProblemReq',
    resProto: 'AddProblemResp',
  });
};

export const getJudgeResult = async () => {
  return request({
    url: '/getJudgeResult',
    data: null,
    resProto: 'JudgeResults',
    method: 'get',
  });
};

export const submitCodeByStudent = async (data) => {
  return request({
    url: '/judge',
    data,
    reqProto: 'JudgeRequest',
    resProto: 'JudgeResponse',
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