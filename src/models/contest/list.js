import {
    fetchList,
  } from '@/services/manage/contest';
  
  export default {
    namespace: 'contestList',
  
    state: {
      list: [], // 比赛列表
      keyword: undefined, // 题目搜索关键字
      pageSize: 10,
      pageIndex: 1,
    },
  
    effects: {
      *fetchList({ payload }, { call, put }) {
        const { matches } = yield call(fetchList, payload);
        yield put({
          type: 'queryList',
          payload: Array.isArray(matches) ? matches : [],
        });
      },
      *saveAdd({ payload }, { call }) {
        console.log(payload);
        const { status, isSuccess } = yield call(AddAnnounceSubmit, payload);
        yield put({
          type: 'setModalInfo',
          payload: {
            visible: false,
          },
        });
      },
      *saveEdit({ payload }, { call, put }) {
        // console.log(payload);
        const { status, isSuccess } = yield call(editAnnounceSubmit, payload);
        // console.log(payload, status, isSuccess);
        yield put({
          type: 'setModalInfo',
          payload: {
            visible: false,
          },
        });
      },
      *deleteItem({ payload }, { call }) {
        const { status } = yield call(deleteAnnounce, payload);
        console.log('deleteAnnounce', status);
      },
      *onEdit({ payload }, { call, put }) {
        yield put({
          type: 'setModalInfo',
          payload: {
            visible: true,
            operation: 1,
            loading: true,
          },
        });
        const { announcement } = yield call(getAnnouncementDetail, payload);
        yield put({
          type: 'setModalInfo',
          payload: {
            editingInfo: announcement,
            loading: false,
          },
        });
      },
      *onAdd(_, { put }) {
        yield put({
          type: 'setModalInfo',
          payload: {
            visible: true,
            operation: 0,
            loading: false,
            editingInfo: {},
          },
        });
      },
      *onCancel(_, { put }) {
        yield put({
          type: 'setModalInfo',
          payload: {
            visible: false,
            loading: false,
          },
        });
      },
    },
  
    reducers: {
      queryList(state, action) {
        return {
          ...state,
          list: action.payload,
        };
      },
      setSearchKeyword(state, action) {
        return {
          ...state,
          keyword: action.payload.keyword,
        };
      },
      setModalInfo(state, action) {
        return {
          ...state,
          ...action.payload,
        };
      },
    },
  };
  