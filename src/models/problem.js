import { fetchList } from '@/services/problem';

export default {
  namespace: 'problem',

  state: {
    list: [], // 題目列表
    keyword: undefined, // 题目搜索关键字
    pageSize: 10,
    pageIndex: 1,
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const { problems: list } = yield call(fetchList, payload);
      //   console.log(list);
      yield put({
        type: 'queryList',
        payload: Array.isArray(list) ? list : [],
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
  },
};
