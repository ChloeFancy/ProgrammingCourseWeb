import {
  getRequestList,
  replyRequest,
} from '@/services/manage/class';

export default {
  namespace: 'requestList',

  state: {
    // 表格数据
    tableLoading: false,
    list: [], // 題目列表
    total: 0, // 总数

    // 搜索参数
    classId: -1,
  },

  effects: {
    *replyRequest({ payload }, { call, select }) {
      const { classId } = yield select(state => state.requestList);
      const { isSuccess } = yield call(replyRequest, { classId, ...payload });
      return isSuccess;
    },
    *setId({ payload }, { put }) {
      yield put({
        type: 'setClassId',
        payload,
      });
    },
    *changeSearchParams({ payload }, { put }) {
      yield put({
        type: 'changeSearchParamsConfig',
        payload,
      });
    },
    *fetchList(_, { call, put, select }) {
      yield put({
        type: 'setTableLoading',
        payload: {
          loading: true,
        },
      });
      const { classId } = yield select(state => state.requestList);
      const { members } = yield call(getRequestList, { classId });
      const requests = members.filter(({ isChecked }) => !isChecked);
      yield put({
        type: 'queryList',
        payload: {
          list: Array.isArray(requests) ? requests : [],
        },
      });
      yield put({
        type: 'setTableLoading',
        payload: {
          loading: false,
        },
      });
    },
  },

  reducers: {
    setClassId(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    changeSearchParamsConfig(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setTableLoading(state, action) {
      return {
        ...state,
        tableLoading: action.payload.loading,
      };
    },
    queryList(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
