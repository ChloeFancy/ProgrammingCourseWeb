import {
  fetchList,
} from '@/services/manage/contest';

export default {
  namespace: 'contestList',

  state: {
    // 表格相关
    tableLoading: false, // 加载中
    list: [], // 比赛列表
    total: 0, // 总数

    // 搜索参数
    keyword: undefined, // 题目搜索关键字
    pageSize: 10,
    pageIndex: 1,
  },

  effects: {
    *setSearchParams({ payload }, { put }) {
      yield put({
        type: 'changeSearchParams',
        payload,
      });
    },
    *fetchList(_, { select, call, put }) {
      yield put({
        type: 'setLoading',
        payload: {
          tableLoading: true,
        },
      });
      const { keyword, pageIndex, pageSize } = yield select(state => state.contestList); 
      const { matches, total } = yield call(fetchList, {
        keyword,
        pageIndex,
        pageNum: pageSize,
      });
      yield put({
        type: 'queryList',
        payload: {
          list: Array.isArray(matches) ? matches : [],
          total,
        },
      });
      yield put({
        type: 'setLoading',
        payload: {
          tableLoading: false,
        },
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
      const { status, isSuccess } = yield call(editAnnounceSubmit, payload);
      yield put({
        type: 'setModalInfo',
        payload: {
          visible: false,
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
    changeSearchParams(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setLoading(state, action) {
      return {
        ...state,
        ...action.payload,
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
