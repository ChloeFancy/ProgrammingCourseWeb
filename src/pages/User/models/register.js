import { register } from '@/services/common/user';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'register',

  state: {
    status: false,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const { isSuccess } = yield call(register, payload);
      yield put({
        type: 'registerHandle',
        payload: isSuccess,
      });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority('user');
      reloadAuthorized();
      console.log(payload)
      return {
        ...state,
        status: payload,
      };
    },
  },
};
