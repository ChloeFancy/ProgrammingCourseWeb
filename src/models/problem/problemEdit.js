import {
  getProblemById,
  getOptions,
  submitCodeByStudent,
} from '@/services/manage/problem';
import { formatOptionsFromMap, transformFromByteToM } from '../../lib/common';
import { formatObjectToFields } from '../../lib/form';
import config, { modeConfig } from '../../configs/problemEdit';
import BraftEditor from '../../components/common/BraftEditor';

export default {
  namespace: 'problemDetail',

  state: {
    loading: false, // 加载中
    // 当前正在编辑(admin)/正在做(student)的题目信息
    problemInfo: {

    },
    // 标签选项
    options: {
      tags: [],
      difficulty: [],
    },

    // 学生提交信息
    studentSubmitInfo: {
      language: undefined,
      code: '',
    },
  },

  effects: {
    *changeStudentSubmitInfo({ payload }, { put }) {
      yield put({
        type: 'updateStudentSubmitInfo',
        payload,
      });
    },
    *submitCodeByStudent(_, { select, call }) {
      const { 
        studentSubmitInfo: { language, code }, 
        problemInfo: { id },
      } = yield select(state => state.problemDetail);
      yield call(submitCodeByStudent, {
        language,
        code,
        id,
      });
    },
    *changeProblemInfo({ payload }, { put }) {
      yield put({
        type: 'updateProblemInfo',
        payload,
      });
    },
    *getInfo({ payload }, { call, put }) {
      const { id, mode } = payload;
      yield put({
        type: 'setPageLoading',
        payload: {
          loading: true,
        },
      });
      const { tags, difficulty } = yield call(getOptions);
      if (id) {
        const { problem } = yield call(getProblemById, { id });
        yield put({
          type: 'setProblemInfo',
          payload: mode === modeConfig.STUDENT ? problem : formatObjectToFields({
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
    updateStudentSubmitInfo(state, action) {
      return {
        ...state,
        studentSubmitInfo: {
          ...state.studentSubmitInfo,
          ...action.payload,
        },
      };
    },
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
