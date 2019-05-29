import request from '../../lib/request';
import api from '../../../config/api.config';

export const fetchList = async (data) => {
  return request({
    ...api.GET_ALL_TAGS,
    data,
  });
};

export const addTag = async (data) => {
  return request({
    ...api.ADD_TAG,
    data,
  });
};

export const updateTag = async (data) => {
  return request({
    ...api.UPDATE_TAG,
    data,
  });
};
