import moment from 'moment';

import { getAnalysisByDifficulty, getAnalysisByTags } from '@/services/statistics';
import { getAllOptions } from '@/services/common/conf';

const dateFormat = 'YYYY/MM/DD';

export default {
    namespace: 'statistics',

    state: {
      options: {
          tags: {},
          difficulty: {},
      },
      difficultyData: {
          line: {},
          pie: {},
      },
      tagsData: {
          line: {},
          pie: {},
      },
      searchParams: {
          userId: undefined,
          startTime: moment(new Date(), dateFormat).subtract(3, 'months'),
          endTime: moment(new Date(), dateFormat),
          tags: [],
      },
    },

    effects: {
        *initInfo({ payload }, { call, put, select }) {
            const options = yield call(getAllOptions);
            yield put({
                type: 'setOptions',
                payload: options,
            });
            yield put({
              type: 'setSearchParams',
              payload: {
                tags: Object.keys(options.tags).map(item => Number(item)),
              },
            });
            const { user: { id: userId } } = yield select(state => state.login);
            yield put({
                type: 'setPageUserId',
                payload: {
                    userId, // 普通用户界面，没有id，就用login的id
                    ...payload, // 管理员页面，url带有id，则覆盖
                },
            });
        },
        *fetchAnalysisByDifficulty(_, { call, put, select }) {
            const { searchParams } = yield select(state => state.statistics);
            const { line, pie } = yield call(getAnalysisByDifficulty, {
              ...searchParams,
              startTime: searchParams.startTime.unix(),
              endTime: searchParams.endTime.unix()
            });
            yield put({
                type: 'setDataByDifficulty',
                payload: {
                    difficultyData: {
                        line,
                        pie,
                    },
                },
            });
        },
        *fetchAnalysisByTags(_, { call, put, select }) {
            const { searchParams } = yield select(state => { return state.statistics; });
            const { line, pie } = yield call(getAnalysisByTags, {
              ...searchParams,
              startTime: searchParams.startTime.unix(),
              endTime: searchParams.endTime.unix()
            });
            yield put({
                type: 'setDataByTags',
                payload: {
                    tagsData: {
                        line,
                        pie,
                    },
                },
            });
        },
    },
    reducers: {
        setPageUserId(state, action) {
            return {
                ...state,
                searchParams: {
                    ...state.searchParams,
                    ...action.payload,
                },
            };
        },
        setSearchParams(state, action) {
            return {
                ...state,
                searchParams: {
                    ...state.searchParams,
                    ...action.payload,
                },
            };
        },
        setDataByDifficulty(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
        setDataByTags(state, action) {
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
