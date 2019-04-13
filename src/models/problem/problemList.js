import {
  fetchList,
  getTagOptions,
} from '@/services/manage/problem';
import { validate } from '@babel/types';

export default {
  namespace: 'problem',

  state: {
    // 搜索框
    tagOptions: [],

    // 表格数据
    tableLoading: false,
    list: [], // 題目列表
    total: 0, // 总数
    
    // 搜索参数
    tag: undefined, // 标签
    keyword: undefined, // 题目搜索关键字
    pageSize: 10,
    pageIndex: 1,
  },

  effects: {
    *changeSearchParams({ payload }, { call, put }) {
      yield put({
        type: 'changeSearchParamsConfig',
        payload,
      });
    },
    *getTagOptions(_, { call, put }) {
      const { tags } = yield call(getTagOptions);
      const tagOptions = Object.entries(tags).map(([number, text]) => ({ key: text, value: number }));
      yield put({
        type: 'setTagOptions',
        payload: {
          tagOptions,
        },
      });
    },
    *fetchList(_, { call, put, select }) {
      yield put({
        type: 'setTableLoading',
        payload: {
          loading: true,
        },
      });
      const { tag, keyword, pageIndex, pageSize } = yield select(state => state.problem);
      const { problems: list, total } = yield call(fetchList, { tag, keyword, pageIndex, pageNum: pageSize });
      yield put({
        type: 'queryList',
        payload: {
          list: Array.isArray(list) ? list : [],
          total,
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
    changeSearchParamsConfig(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setTagOptions(state, action) {
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
    setSearchKeyword(state, action) {
      return {
        ...state,
        keyword: action.payload.keyword,
      };
    },
  },
};
