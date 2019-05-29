import { query as queryUsers } from '@/services/user';
import { getCurrentUser } from '@/utils/authority';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { put }) {
      // 每到一個頁面都獲取用戶信息
      // 其實這裏應該傳token到服務器端獲取用戶信息的
      // 但是爲了簡單就從cookie中獲取
      yield put({
        type: 'saveCurrentUser',
        payload: getCurrentUser(),
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
