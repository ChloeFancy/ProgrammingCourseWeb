import {
  fetchList,
  editAnnounceSubmit,
  deleteAnnounce,
  AddAnnounceSubmit,
  getAnnouncementDetail,
} from '@/services/manage/announce';

export default {
  namespace: 'announce',

  state: {
    list: [], // 公告列表
    keyword: undefined, // 题目搜索关键字
    pageSize: 10,
    pageIndex: 1,

    operation: 0, // 0 - 新增，1 - 编辑
    visible: false, // modal是否可见
    loading: false, // modal内容加载中
    editingInfo: {}, // modal表单内容
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const { announcements } = yield call(fetchList, payload);
      console.log(announcements);
      yield put({
        type: 'queryList',
        payload: Array.isArray(announcements) ? announcements : [],
      });
    },
    *saveAdd({ payload }, { call }) {
      const { status, isSuccess } = yield call(AddAnnounceSubmit, payload);
      yield put({
        type: 'setModalInfo',
        payload: {
          visible: false,
        },
      });
    },
    *saveEdit({ payload }, { call, put }) {
      // console.log(payload);
      const { status, isSuccess } = yield call(editAnnounceSubmit, payload);
      // console.log(payload, status, isSuccess);
      yield put({
        type: 'setModalInfo',
        payload: {
          visible: false,
        },
      });
    },
    *deleteItem({ payload }, { call }) {
      const { status } = yield call(deleteAnnounce, payload);
      console.log('deleteAnnounce', status);
    },
    *onEdit({ payload }, { call, put }) {
      yield put({
        type: 'setModalInfo',
        payload: {
          visible: true,
          operation: 1,
          loading: true,
        },
      });
      const { announcement } = yield call(getAnnouncementDetail, payload);
      yield put({
        type: 'setModalInfo',
        payload: {
          editingInfo: announcement,
          loading: false,
        },
      });
    },
    *onAdd(_, { put }) {
      yield put({
        type: 'setModalInfo',
        payload: {
          visible: true,
          operation: 0,
          loading: false,
          editingInfo: {},
        },
      });
    },
    *onCancel(_, { put }) {
      yield put({
        type: 'setModalInfo',
        payload: {
          visible: false,
          loading: false,
        },
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    setSearchKeyword(state, action) {
      return {
        ...state,
        keyword: action.payload.keyword,
      };
    },
    setModalInfo(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
