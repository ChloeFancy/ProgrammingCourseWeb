import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { message } from 'antd';
import { getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { login, logout } from '@/services/common/user';
import { GUEST } from '../configs/UserList';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    user: {},
  },

  effects: {
    *login({ payload }, { call, put }) {
      const { token, user } = yield call(login, payload);
      if (token && user) {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'ok',
            type: '',
            currentAuthority: user.role,
            token,
            name: user.name,
          },
        });
        yield put({
          type: 'setUserInfo',
          payload: {
            user,
          },
        });

        reloadAuthorized();
        // 重定向到登录之前的页面
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            redirect = null;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      } else {
        message.error('用户名和密码错误，请重新输入');
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put, call }) {
      yield call(logout);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: GUEST,
          // 登出后就设置游客
        },
      });
      reloadAuthorized();
      // redirect
      if (window.location.pathname !== '/user/login') {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
  },

  reducers: {
    setUserInfo(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority, payload.token, payload.name);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
