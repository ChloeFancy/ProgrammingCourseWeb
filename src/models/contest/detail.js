import moment from 'moment';
import {
  getAllOptions,
  getMatchByID,
  getPaperByID,
  editContest,
  addContest,
} from '@/services/manage/contest';
import { formatOptionsFromMap } from '../../lib/common';
import { formatObjectToFields, formatRequestFromFields } from '../../lib/form';
import { contestConfig, paperConfig } from '../../configs/contest';

export default {
  namespace: 'contestDetail',

  state: {
    loading: false,
    contestInfo: {},
    paperInfo: {},
    options: {
        cognition: [],
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
      yield call(contestInfo.id ? editContest : addContest, data);
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
              [contestConfig.endTime.dataIndex]: moment.unix(contestInfo[contestConfig.endTime.dataIndex]),
              [contestConfig.startTime.dataIndex]: moment.unix(contestInfo[contestConfig.startTime.dataIndex]),
            }),
            paperInfo: formatObjectToFields(paperInfo),
          },
        });
      } else {
        yield put({
          type: 'setContestAndPaperInfo',
          payload: {
            contestInfo:{},
            paperInfo: {},
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
