import {
    getSubmitRecords,
    getLanguageOptions,
} from '@/services/manage/problem';
import { formatOptionsFromMap } from '../../lib/common';

export default {
    namespace: 'submitRecords',

    state: {
        // 表格数据
        tableLoading: false,
        list: [], // 題目列表
        total: 0, // 总数

        languageMap: {}, // 提交语言映射

        // 搜索参数
        pageSize: 10,
        pageIndex: 1,
        problemId: -1, // todo
    },

    effects: {
        *getLanguageMap(_, { put, call }) {
            const { language } = yield call(getLanguageOptions);
            yield put({
              type: 'setLanguageMap',
              payload: {
                languageMap: language,
              },
            });
          },
        *setId({ payload }, { put }) {
            yield put({
                type: 'setProblemId',
                payload,
            });
        },
        *changeSearchParams({ payload }, { call, put }) {
            yield put({
                type: 'changeSearchParamsConfig',
                payload,
            });
        },
        *fetchList(_, { call, put, select }) {
            yield put({
                type: 'setTableLoading',
                payload: {
                    loading: true,
                },
            });
            const { pageIndex, pageSize, problemId } = yield select(state => state.submitRecords);
            const { submitRecords: list, total } = yield call(getSubmitRecords, { problemId, pageIndex, pageNum: pageSize });
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
        setLanguageMap(state, action) {
            return {
              ...state,
              ...action.payload,
            };
          },
        setProblemId(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
        changeSearchParamsConfig(state, action) {
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
    },
};
  