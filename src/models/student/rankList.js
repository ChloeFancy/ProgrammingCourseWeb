import {
    fetchRankList,
} from '@/services/student/rank';
import { formatOptionsFromMap } from '../../lib/common';

export default {
namespace: 'rankList',

state: {
    // 表格数据
    tableLoading: false,
    list: [], // 題目列表
    total: 0, // 总数

    // 搜索参数
    pageSize: 10,
    pageIndex: 1,
    classId: -1,
},

effects: {
    *setId({ payload }, { put }) {
        yield put({
            type: 'setClassId',
            payload,
        });
    },
    *changeSearchParams({ payload }, { put }) {
        yield put({
            type: 'changeSearchParamsConfig',
            payload,
        });
    },
    *fetchList({ payload }, { call, put, select }) {
        yield put({
            type: 'setTableLoading',
            payload: {
                loading: true,
            },
        });
        const { pageIndex, pageSize, classId } = yield select(state => state.memberList);
        const { rankItems: list, total } = yield call(fetchRankList, { pageIndex, pageNum: pageSize });
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
    setClassId(state, action) {
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
  