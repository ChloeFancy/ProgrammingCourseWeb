import {
  getProblemById,
  getTagOptions,
} from '@/services/manage/problem';
import { validate } from '@babel/types';
import { formatOptionsFromMap } from '../../lib/common';

export default {
  namespace: 'problemEdit',

  state: {
    loading: false, // 加载中
    // 当前正在编辑的题目信息
    problemInfo: {

    },
    // 标签选项
    options: {
      tags: [],
      difficulty: [],
    },
  },

  effects: {
    *changeProblemInfo({ payload }, { put }) {
      yield put({
        type: 'updateProblemInfo',
        payload,
      });
    },
    *getInfo({ payload: { id } }, { call, put, all }) {
      yield put({
        type: 'setPageLoading',
        payload: {
          loading: true,
        },
      });
      // todo 
      const [ { problem }, { tags, difficulty } ] = yield all([
        id && call(getProblemById, payload),
        call(getTagOptions),
      ]);
      yield put({
        type: 'setTagOptions',
        payload: {
          options: {
            tags: formatOptionsFromMap(tags),
            difficulty: formatOptionsFromMap(difficulty),
          },
        },
      });
      yield put({
        type: 'setProblemInfo',
        payload: formatObejctToFields(problem),
      });
      yield put({
        type: 'setPageLoading',
        payload: {
          loading: false,
        },
      });
    },
  },

  reducers: {
    setTagOptions(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setPageLoading(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateProblemInfo(state, action) {
      return {
        ...state,
        problemInfo: {
          ...state.problemInfo,
          ...action.payload,
        },
      };
    },
    setProblemInfo(state, action) {
      return {
        ...state,
        problemInfo: action.payload,
      };
    },
  },
};
