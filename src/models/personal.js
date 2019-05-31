import { formatObjectToFields, formatRequestFromFields } from '../lib/form';
import {
  submitUserInfo,
} from '@/services/manage/userList';
import { getCurrentUser } from '../utils/authority';

export default {
  namespace: 'personalCenter',

  state: {
    info: {},
  },

  effects: {
    *init(_, { put }) {
      yield put({
        type: 'setInfo',
        payload: {
          info: formatObjectToFields(getCurrentUser()),
        },
      });
    },
    *changeInfo({ payload }, { put }) {
      yield put({
        type: 'updateInfo',
        payload: {
          info: payload,
        },
      });
    },
    *submit({ payload }, { call, select }) {
      const { info } = yield select(state => state.personalCenter);
      const { succeed } = yield call(submitUserInfo, { users: [formatRequestFromFields(info)] });
      return succeed && succeed.length;
    },
  },

  reducers: {
    setInfo(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateInfo(state, action) {
      return {
        ...state,
        info: {
          ...state.info,
          ...action.payload.info,
        }
      }
    }
  },
};
