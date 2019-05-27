import { STUDENT, TEACHER, ADMIN, GUEST } from './role.config';

export default {
  // todo 补充完
  CONF: {
    url: '/conf',
    resProto: 'Config',
    method: 'get',
  },
  LOGIN: {
    url: '/login',
    reqProto: 'LoginReq',
    resProto: 'LoginResp',
  },
  LOGOUT: {
    url: '/logout',
    method: 'get',
    resProto: 'LogoutResp',
  },
  REGISTER: {
    url: '/register',
    reqProto: 'RegisterReq',
    resProto: 'RegisterResp',
  },
  GET_ANNOUNCEMENTS: {
    url: '/getAnnouncements',
    reqProto: 'AnnouncementsReq',
    resProto: 'AnnouncementsResp',
  },
  EDIT_ANNOUNCEMENTS: {
    url: '/editAnnouncement',
    reqProto: 'EditAnnouncementReq',
    resProto: 'EditAnnouncementResp',
    auth: [ADMIN],
  },
  GET_ANNOUNCEMENT_DETAIL: {
    url: '/announcementDetail',
    reqProto: 'AnnouncementDetailReq',
    resProto: 'AnnouncementDetailResp',
  },
  ADD_ANNOUNCEMENT_SUBMIT: {
    url: '/addAnnouncement',
    reqProto: 'AddAnnouncementReq',
    resProto: 'AddAnnouncementResp',
    auth: [ADMIN],
  },
  DELETE_ANNOUNCE: {
    url: '/delAnnouncement',
    reqProto: 'DelAnnouncementReq',
    resProto: 'DelAnnouncementResp',
    auth: [ADMIN],
  }
};
