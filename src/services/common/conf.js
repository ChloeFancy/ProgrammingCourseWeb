import request from '../../lib/request';
import api from '../../../config/api.config';

export const getAllOptions = async () => {
  return request({
    ...api.CONF,
    data: null,
  });
};
