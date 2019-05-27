import {
  fetchList,
} from '@/services/manage/announce';

export default {
  namespace: 'studentAnnounce',

  state: {
    // 表格数据
    loading: false,
    list: [], // 題目列表
    // total: 0, // 总数

    // 搜索参数
    pageSize: 10,
    pageIndex: 1, // 初始化取前10条
  },

  effects: {
    *fetchList({ payload }, { call, put, select }) {
      yield put({
        type: 'setTableLoading',
        payload: {
          loading: true,
        },
      });
      const { pageIndex, pageSize, list: currentList } = yield select(state => state.studentAnnounce);
      const { announcements: list, total } = yield call(fetchList, { pageIndex, pageNum: pageSize });
      yield put({
        type: 'queryList',
        payload: {
          list: Array.isArray(list) ? [...currentList, ...list] : [...currentList],
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
    addPageIndex(state) {
      return {
        ...state,
        pageIndex: state.pageIndex + 1,
      };
    },
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
        loading: action.payload.loading,
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
