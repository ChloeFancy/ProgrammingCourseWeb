import { STUDENT, TEACHER, ADMIN, GUEST } from './role.config';
const GET = 'get';

export default {
  // todo 补充完
  CONF: {
    url: '/conf',
    resProto: 'Config',
    method: GET,
  },
  LOGIN: {
    url: '/login',
    reqProto: 'LoginReq',
    resProto: 'LoginResp',
  },
  LOGOUT: {
    url: '/logout',
    method: GET,
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
  },
  GET_ALGORITHM: {
    url: '/paperComposeAlgorithm',
    resProto: 'PaperComposeAlgorithm',
    method: GET,
  },
  GENERATE_PAPER: {
    url: '/newPaper',
    reqProto: 'NewPaperReq',
    resProto: 'NewPaperResp',
    auth: [ADMIN, TEACHER],
  },
  MODIFY_PAPER: {
    url: '/modifyPaper',
    reqProto: 'ManualModifyPaperReq',
    resProto: 'ManualModifyPaperResp',
    auth: [ADMIN, TEACHER],
  },
  GET_CLASS_REQUESTS: {
    url: '/getMember',
    reqProto: 'GetMemberReq',
    resProto: 'GetMemberResp',
    auth: [ADMIN, TEACHER],
  },
  REPLY_ENTER_REQUEST: {
    url: '/applyEnterRequest',
    reqProto: 'ApplyEnterRequestReq',
    resProto: 'ApplyEnterRequestResp',
    auth: [ADMIN, TEACHER],
  },
  SEARCH_CLASS: {
    url: '/searchClasses',
    reqProto: 'SearchClassesReq',
    resProto: 'SearchClassesResp',
    auth: [ADMIN, TEACHER, STUDENT],
  },
  APPLY_ENTER_CLASS: {
    url: '/enterClass',
    reqProto: 'EnterClassReq',
    resProto: 'EnterClassResp',
    auth: [ADMIN, TEACHER, STUDENT],
  },
  QUIT_CLASS: {
    url: '/quitClass',
    reqProto: 'QuitClassReq',
    resProto: 'QuitClassResp',
    auth: [ADMIN, TEACHER, STUDENT],
  },
  MANAGE_CLASS_MEMBER: {
    url: '/memberManage',
    reqProto: 'MemberManageReq',
    resProto: 'MemberManageResp',
    auth: [ADMIN, TEACHER],
  },
  GET_MY_CLASS: {
    url: '/getClassesByUserID',
    resProto: 'GetClasserByUserID',
    method: GET,
    auth: [ADMIN, TEACHER, STUDENT],
  },
  GET_ALL_TAGS: {
    url: '/getTags',
    reqProto: 'GetTagsReq',
    resProto: 'GetTagsResp',
    auth: [ADMIN, TEACHER],
  },
  ADD_TAG: {
    url: '/addTag',
    reqProto: 'AddTagReq',
    resProto: 'AddTagResp',
    auth: [ADMIN, TEACHER],
  },
  UPDATE_TAG: {
    url: '/updateTag',
    reqProto: 'UpdateTagReq',
    resProto: 'UpdateTagResp',
    auth: [ADMIN, TEACHER],
  },
  DEL_USER: {
    url: '/delUsers',
    reqProto: 'DelUsersReq',
    resProto: 'DelUsersResp',
    auth: [ADMIN, TEACHER],
  }
};
