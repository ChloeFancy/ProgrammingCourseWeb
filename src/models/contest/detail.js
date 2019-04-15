import moment from 'moment';
import {
  getAllOptions,
  getMatchByID,
  getPaperByID,
} from '@/services/manage/contest';
import { formatOptionsFromMap } from '../../lib/common';
import { formatObjectToFields } from '../../lib/form';
import { contestConfig } from '../../configs/contest';

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
    *getInfo({ payload }, { call, put, all }) {
      yield put({
        type: 'setPageLoading',
        payload: {
          loading: true,
        },
      });
      const { id } = payload;
      const [options, { match: contestInfo } ] = yield all([
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
