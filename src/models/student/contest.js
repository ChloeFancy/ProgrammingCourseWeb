import {
  fetchList,
  getMatchByID,
  getPaperByID,
} from '@/services/manage/contest';
import {
  getLanguageOptions,
  getProblemById,
} from '@/services/manage/problem';
import { formatOptionsFromMap } from '../../lib/common';

export default {
  namespace: 'studentContest',

  state: {
    // 列表页：

    // 表格相关
    tableLoading: false, // 加载中
    list: [], // 考试列表
    total: 0, // 总数

    // 搜索参数
    keyword: undefined, // 题目搜索关键字
    pageSize: 10,
    pageIndex: 1,

    // 介绍页：
    contestInfo: {},
    contestLoading: false,

    // 考试页：
    languageOptions: [],
    paperInfo: {},
    paperLoading: false,

  },

  effects: {
    *getLanguageOptions(_, { put, call }) {
      const { language } = yield call(getLanguageOptions);
      yield put({
        type: 'setLanguageOptions',
        payload: {
          languageOptions: formatOptionsFromMap(language),
        },
      });
    },
    *getPaperInfo(_, { select, call, put, all }) {
      yield put({
        type: 'setPaperInfo',
        payload: {
          paperLoading: true,
        },
      });
      const { contestInfo: { paperId } } = yield select(state => state.studentContest);
      if (!paperId) {
        return false;
      }
      const { paper } = yield call(getPaperByID, { id: paperId });
      const problemRequests = paper.problems.map(({ id }) => {
        return call(getProblemById, { id });
      });
      const problems = (yield all(problemRequests)).map(({ problem }) => problem);
      yield put({
        type: 'setPaperInfo',
        payload: {
          paperInfo: { ...paper, problems },
          paperLoading: false,
        },
      });
      return true;
    },
    *getContestInfo({ payload }, { call, put }) {
      yield put({
        type: 'setContestInfo',
        payload: {
          contestLoading: true,
        },
      });
      const { match } = yield call(getMatchByID, payload);
      yield put({
        type: 'setContestInfo',
        payload: {
          contestInfo: match,
          contestLoading: false,
        },
      });
    },
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
      const { keyword, pageIndex, pageSize } = yield select(state => state.studentContest);
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
  },

  reducers: {
    setLanguageOptions(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setPaperInfo(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setContestInfo(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
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
