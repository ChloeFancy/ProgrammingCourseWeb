import request from '../../lib/request';
import api from '../../../config/api.config';

export const fetchList = async (data) => {
  return request({
    ...api.GET_ANNOUNCEMENTS,
    data,
  });
};

export const editAnnounceSubmit = async (data) => {
  return request({
    ...api.EDIT_ANNOUNCEMENTS,
    data,
  });
};

export const getAnnouncementDetail = async (data) => {
  return request({
    ...api.GET_ANNOUNCEMENT_DETAIL,
    data,
  });
};

export const AddAnnounceSubmit = async (data) => {
  return request({
    ...api.ADD_ANNOUNCEMENT_SUBMIT,
    data,
  });
};

export const deleteAnnounce = async (data) => {
  return request({
    ...api.DELETE_ANNOUNCE,
    data,
  });
};
