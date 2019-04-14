import {
  fetchList,
  editAnnounceSubmit,
  deleteAnnounce,
  AddAnnounceSubmit,
  getAnnouncementDetail,
} from '@/services/manage/announce';
import { formatObjectToFields, formatRequestFromFields } from '../../lib/form';

export default {
  namespace: 'announce',

  state: {
    list: [], // 公告列表
    total: 0, // 总数
    keyword: undefined, // 题目搜索关键字
    pageSize: 10,
    pageIndex: 1,

    operation: 0, // 0 - 新增，1 - 编辑
    visible: false, // modal是否可见
    loading: false, // modal内容加载中
    editingInfo: {}, // modal表单内容
  },

  effects: {
    *changeTablePage({ payload }, { call, put }) {
      const { pageSize, pageIndex } = payload;
      yield put({
        type: 'changeTabelPageConfig',
        payload: {
          pageSize,
          pageIndex,
        },
      });
    },
    *changeModalForm({ payload }, { call, put }) {
      yield put({
        type: 'changeEditingInfo',
        payload,
      });
    },
    *fetchList(_, { call, put, select }) {
      const { pageIndex, pageSize: pageNum } = yield select(state => state.announce);
      const { announcements, total } = yield call(fetchList, {
        pageIndex,
        pageNum,
      });

      yield put({
        type: 'queryList',
        payload: {
          list: Array.isArray(announcements) ? announcements : [],
          total,
        },
      });
    },
    *saveAdd({ payload }, { call, put }) {
      const { status, isSuccess } = yield call(AddAnnounceSubmit, { announcement: formatRequestFromFields(payload) });
      yield put({
        type: 'setModalInfo',
        payload: {
          visible: false,
          editingInfo: {},
        },
      });
    },
    *saveEdit({ payload }, { call, put }) {
      const { status, isSuccess } = yield call(editAnnounceSubmit, { announcement: formatRequestFromFields(payload) });
      yield put({
        type: 'setModalInfo',
        payload: {
          visible: false,
          editingInfo: {},
        },
      });
    },
    *deleteItem({ payload }, { call }) {
      const { status } = yield call(deleteAnnounce, payload);
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
          editingInfo: formatObjectToFields(announcement),
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
          editingInfo: {},
        },
      });
    },
  },

  reducers: {
    changeTabelPageConfig(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    changeEditingInfo(state, action) {
      return {
        ...state,
        editingInfo: {
          ...state.editingInfo,
          ...action.payload,
        },
      };
    },
    queryList(state, action) {
      return {
        ...state,
        ...action.payload,
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
