import {
  fetchList,
  submitUserInfo,
  getUserRoleOptions,
  delUser,
} from '@/services/manage/userList';
import { formatObjectToFields } from '../../lib/form';
import { formatOptionsFromMap } from '../../lib/common';

export default {
  namespace: 'userList',

  state: {
    // 角色选项
    userTypeOptions: [],

    // 表格数据
    tableLoading: false,
    list: [], // 題目列表
    total: 0,

    // 搜索参数
    keyword: undefined, // 题目搜索关键字
    role: undefined, // 角色选择
    pageSize: 10,
    pageIndex: 1,

    // 编辑框
    modalVisible: false,
    editingInfo: {},
  },

  effects: {
    *getUserRoleOptions(_, { call, put }) {
      const { role } = yield call(getUserRoleOptions);
      const userTypeOptions = formatOptionsFromMap(role);
      yield put({
        type: 'setUserRoleOptions',
        payload: {
          userTypeOptions,
        },
      });
    },
    *changeTablePage({ payload }, { call, put }) {
      const { pageSize, pageIndex } = payload;
      yield put({
        type: 'changeTabelPageConfig',
        payload: {
          pageSize,
          pageIndex,
        },
      });
    },
    *changeModalForm({ payload }, { call, put }) {
      yield put({
        type: 'changeEditingInfo',
        payload,
      });
    },
    *handleSubmit({ payload }, { call }) {
      const params = {
        users: [payload],
      };
      const { succeed } = yield call(submitUserInfo, params);
      return succeed && succeed.length;
    },
    *handleDelete({ payload }, { call }) {
      const { succeed } = yield call(delUser, { usersId: [payload.deleteUser.id] });
      return succeed && succeed.length;
    },
    *handleEdit({ payload }, { put }) {
      yield put({
        type: 'changeModalStatus',
        payload: {
          modalVisible: true,
          editingInfo: formatObjectToFields(payload.editingUser),
        },
      });
    },
    *closeEdit(_, { put }) {
      yield put({
        type: 'changeModalStatus',
        payload: {
          modalVisible: false,
          editingInfo: {},
        },
      });
    },
    *fetchList({ payload }, { call, put, select }) {
      yield put({
        type: 'setTableLoading',
        payload: {
          loading: true,
        },
      });
      const {
        keyword,
        role,
        pageSize,
        pageIndex,
      } = yield select(state => state.userList);
      const { users: list, total } = yield call(fetchList, {
        keyword,
        role,
        pageIndex,
        pageNum: pageSize,
        ...payload,
      });
      yield put({
        type: 'setSearchParams',
        payload,
      });
      yield put({
        type: 'queryList',
        payload: {
          list: Array.isArray(list) ? list : [],
          total,
          pageIndex,
          pageSize,
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
    setUserRoleOptions(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setSearchParams(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    changeTabelPageConfig(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    changeEditingInfo(state, action) {
      return {
        ...state,
        editingInfo: {
          ...state.editingInfo,
          ...action.payload,
        },
      };
    },
    changeModalStatus(state, action) {
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
    setSearchKeyword(state, action) {
      return {
        ...state,
        keyword: action.payload.keyword,
      };
    },
  },
};
