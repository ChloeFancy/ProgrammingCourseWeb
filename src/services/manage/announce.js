import request from '../../lib/request';

export const fetchList = async () => {
  const data = {
    pageIndex: 1,
    pageNum: 10,
  };
  return request({
    url: '/getAnnouncements',
    data,
    reqProto: 'AnnouncementsReq',
    resProto: 'AnnouncementsResp',
  });
};

export const editAnnounceSubmit = async (data) => {
  return request({
    url: '/editAnnouncement',
    data,
    reqProto: 'EditAnnouncementReq',
    resProto: 'EditAnnouncementResp',
  });
};

export const getAnnouncementDetail = async (data) => {
  return request({
    url: '/announcementDetail',
    data,
    reqProto: 'AnnouncementDetailReq',
    resProto: 'AnnouncementDetailResp',
  });
};

export const AddAnnounceSubmit = async (data) => {
  return request({
    url: '/addAnnouncement',
    data,
    reqProto: 'AddAnnouncementReq',
    resProto: 'AddAnnouncementResp',
  });
};

export const deleteAnnounce = async (data) => {
  return request({
    url: '/delAnnouncement',
    data,
    reqProto: 'DelAnnouncementReq',
    resProto: 'DelAnnouncementResp',
  });
};
