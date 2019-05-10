import moment from 'moment';
import {
  getMatchByID,
  getPaperByID,
  editContest,
  addContest,
  generatePaper,
  deleteProblemFromPaper,
} from '@/services/manage/contest';
import { getAllOptions } from '@/services/common/conf';
import { formatOptionsFromMap } from '../../lib/common';
import { formatObjectToFields, formatRequestFromFields, formatBraftEditorField } from '../../lib/form';
import { contestConfig, paperConfig } from '../../configs/contest';

export default {
  namespace: 'contestDetail',

  state: {
    loading: false,
    contestInfo: {},
    paperInfo: {},
    problemList: [],
    paperTableLoading: false,
    options: {
        tags: [],
        difficulty: [],
    },
  },

  effects: {
    *submitContestWithPaper(_, { call, select }) {
      const { contestInfo, paperInfo } = yield select(state => state.contestDetail);
      const match = formatRequestFromFields(contestInfo);
      const paper = formatRequestFromFields(paperInfo);

      const data = {
        match: {
          ...match,
          [contestConfig.startTime.dataIndex]: match[contestConfig.startTime.dataIndex].unix(),
          [contestConfig.endTime.dataIndex]: match[contestConfig.endTime.dataIndex].unix(),
          [contestConfig.introduction.dataIndex]: match[contestConfig.introduction.dataIndex].toHTML(),
        },
        paper: {
          ...paper,
        },
      };
      const { isSuccess } = yield call(contestInfo.id ? editContest : addContest, data);
      return isSuccess;
    },
    *changeContestInfo({ payload }, { put }) {
      yield put({
        type: 'updateContestInfo',
        payload,
      });
    },
    *changePaperInfo({ payload }, { put }) {
      yield put({
        type: 'updatePaperInfo',
        payload,
      });
    },
    *handleDeleteProblem({ payload }, { call, put }) {
      const { isSuccess } = yield call(deleteProblemFromPaper);
      if (isSuccess) {
        yield put({
          type: 'updateProblemList',
          payload: payload.problemList,
        });
      }
    },
    *handleEditProblemList({ payload }, { put }) {
      yield put({
        type: 'updateProblemList',
        payload,
      });
    },
    *generatePaper({ payload }, { call, put }) {
      yield put({
        type: 'setPaperTableLoading',
        payload: true,
      });
      const res = yield call(generatePaper, payload);
      if (res && res.problems) {
        yield put({
          type: 'updateProblemList',
          payload: res.problems,
        });
      }
      yield put({
        type: 'setPaperTableLoading',
        payload: false,
      });
    },
    *getInfo({ payload }, { call, put, all }) {
      yield put({
        type: 'setPageLoading',
        payload: {
          loading: true,
        },
      });
      const { id } = payload;
      const [options, matchRes] = yield all([
        call(getAllOptions, payload),
        id && call(getMatchByID, { id }),
      ]);
      yield put({
        type: 'setOptions',
        payload: Object.entries(options).reduce((prev, [key, map]) => {
          return {
            ...prev,
            [key]: formatOptionsFromMap(map),
          };
        }, {}),
      });
      if (id) {
        const { match: contestInfo } = matchRes;
        const { paperId } = contestInfo;
        const { paper: paperInfo } = yield call(getPaperByID, { id: paperId });
        yield put({
          type: 'setContestAndPaperInfo',
          payload: {
            contestInfo: formatObjectToFields({
              ...contestInfo,
              ...formatBraftEditorField(contestInfo, [contestConfig.introduction.dataIndex]),
              [contestConfig.endTime.dataIndex]: moment.unix(contestInfo[contestConfig.endTime.dataIndex]),
              [contestConfig.startTime.dataIndex]: moment.unix(contestInfo[contestConfig.startTime.dataIndex]),
            }),
            paperInfo: formatObjectToFields(paperInfo),
            problemList: paperInfo.problems,
          },
        });
      } else {
        yield put({
          type: 'setContestAndPaperInfo',
          payload: {
            contestInfo: formatObjectToFields({
              ...formatBraftEditorField({}, [contestConfig.introduction.dataIndex]),
            }),
            paperInfo: {},
            problemList: [],
          },
        });
      }
      yield put({
        type: 'setPageLoading',
        payload: {
          loading: false,
        },
      });
    },
  },

  reducers: {
    setPaperTableLoading(state, action) {
      return {
        ...state,
        paperTableLoading: action.payload,
      };
    },
    updateContestInfo(state, action) {
      return {
        ...state,
        contestInfo: {
          ...state.contestInfo,
          ...action.payload,
        },
      };
    },
    updatePaperInfo(state, action) {
      return {
        ...state,
        paperInfo: {
          ...state.paperInfo,
          ...action.payload,
        },
      };
    },
    updateProblemList(state, action) {
      return {
        ...state,
        problemList: action.payload,
      };
    },
    setContestAndPaperInfo(state, action) {
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
    setOptions(state, action) {
      return {
        ...state,
        options: {
          ...action.payload,
        },
      };
    },
  },
};
