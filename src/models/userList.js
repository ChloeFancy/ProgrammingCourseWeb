import { fetchList } from '@/services/userList';

export default {
  namespace: 'userList',

  state: {
    list: [], // 題目列表
    keyword: undefined, // 题目搜索关键字
    pageSize: 10,
    pageIndex: 1,
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const { users: list, total, pageIndex, pageNum } = yield call(fetchList, payload);
      yield put({
        type: 'queryList',
        payload: {
          list: Array.isArray(list) ? list : [],
          total,
          pageIndex,
          pageSize: pageNum,
        },
      });
    },
  },

  reducers: {
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
  },
};
