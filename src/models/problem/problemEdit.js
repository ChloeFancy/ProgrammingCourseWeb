import {
  getProblemById,
  getTagOptions,
} from '@/services/manage/problem';
import { formatOptionsFromMap, transformFromByteToM } from '../../lib/common';
import { formatObjectToFields } from '../../lib/form';
import config from '../../configs/problemEdit';
import BraftEditor from '../../components/common/BraftEditor';

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
    *getInfo({ payload }, { call, put }) {
      const { id } = payload;
      yield put({
        type: 'setPageLoading',
        payload: {
          loading: true,
        },
      });
      const { tags, difficulty } = yield call(getTagOptions);
      if (id) {
        const { problem } = yield call(getProblemById, { id });
        yield put({
          type: 'setProblemInfo',
          payload: formatObjectToFields({
            ...problem,
            [config.judgeLimitMem.dataIndex]: transformFromByteToM(problem[config.judgeLimitMem.dataIndex]),
          }),
        });
      }
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
