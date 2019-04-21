import {
  getProblemById,
  getOptions,
  submitCodeByStudent,
  getLanguageOptions,
  editProblem,
  addProblem,
  getJudgeResult,
} from '@/services/manage/problem';
import { formatOptionsFromMap, transformFromByteToM } from '../../lib/common';
import { formatObjectToFields, formatRequestFromFields, formatBraftEditorField } from '../../lib/form';
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

    // 代码提交中
    codeSubmitting: false,

    // 判题结果
    judgeResults: [],

    // 语言选项
    languageOptions: [],
  },

  effects: {
    *getJudgeResultsMap(_, { put, call }) {
      const { judgeResults: judgeResultsMap } = yield call(getJudgeResult);
      yield put({
        type: 'setJudgeResultsMap',
        payload: {
          judgeResultsMap,
        },
      });
    },
    *submitEditProblem({ payload }, { call, select }) {
      const { problemInfo } = yield select(state => state.problemDetail);
      const { isSuccess } = yield call(problemInfo.id ? editProblem : addProblem, {
        problem: formatRequestFromFields({
          ...problemInfo,
          ...payload,
        }),
      });
      return isSuccess;
    },
    *getLanguageOptions(_, { put, call }) {
      const { language } = yield call(getLanguageOptions);
      yield put({
        type: 'setLanguageOptions',
        payload: {
          languageOptions: formatOptionsFromMap(language),
        },
      });
    },
    *changeStudentSubmitInfo({ payload }, { put }) {
      yield put({
        type: 'updateStudentSubmitInfo',
        payload,
      });
    },
    *submitCodeByStudent(_, { select, call, put }) {
      yield put({
        type: 'setCodeUpdating',
        payload: true,
      });
      const { 
        studentSubmitInfo: { language, code }, 
        problemInfo: { id },
      } = yield select(state => state.problemDetail);
      const { results } = yield call(submitCodeByStudent, {
        language,
        src: code,
        id,
      });
      yield put({
        type: 'setJudgeResults',
        payload: results,
      });
      yield put({
        type: 'setCodeUpdating',
        payload: false,
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
          payload: mode === modeConfig.STUDENT ? problem : {
            ...formatObjectToFields({
              ...problem,
              ...formatBraftEditorField(problem, [config.description.dataIndex, config.hint.dataIndex]),              
            }),
          },
        });
      } else {
        yield put({
          type: 'setProblemInfo',
          payload: formatObjectToFields({
            ...formatBraftEditorField({}, [config.description.dataIndex, config.hint.dataIndex]),                          
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
    setJudgeResults(state, action) {
      return {
        ...state,
        judgeResults: action.payload,
      };
    },
    setCodeUpdating(state, action) {
      return {
        ...state,
        codeSubmitting: action.payload,
      };
    },
    updateStudentSubmitInfo(state, action) {
      return {
        ...state,
        studentSubmitInfo: {
          ...state.studentSubmitInfo,
          ...action.payload,
        },
      };
    },
    setJudgeResultsMap(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setLanguageOptions(state, action) {
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
