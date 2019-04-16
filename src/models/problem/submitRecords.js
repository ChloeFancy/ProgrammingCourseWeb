import {
getSubmitRecords,
} from '@/services/manage/problem';
import { formatOptionsFromMap } from '../../lib/common';

export default {
namespace: 'submitRecords',

state: {
    // 表格数据
    tableLoading: false,
    list: [], // 題目列表
    total: 0, // 总数

    // 搜索参数
    pageSize: 10,
    pageIndex: 1,
},

effects: {
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
        const { pageIndex, pageSize } = yield select(state => state.problem);
        const { submitRecords: list, total } = yield call(getSubmitRecords, { pageIndex, pageNum: pageSize });
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
  