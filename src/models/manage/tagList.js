import {
  fetchList,
  addTag,
  updateTag,
} from '@/services/manage/tagList';

const defaultEditingInfo = {};

export default {
  namespace: 'tagList',

  state: {
    list: [], // tag列表
    total: 0, // 总数
    pageSize: 10,
    pageIndex: 1,

    operation: 0, // 0 - 新增，1 - 编辑
    visible: false, // modal是否可见
    editingInfo: defaultEditingInfo, // modal表单内容
  },

  effects: {
    *handleInput({ payload }, { put, select }) {
      const { editingInfo } = yield select(state => state.tagList);
      yield put({
        type: 'setModalInfo',
        payload: {
          editingInfo: { ...editingInfo, ...payload },
        },
      });
    },
    *changeTablePage({ payload }, { put }) {
      const { pageSize, pageIndex } = payload;
      yield put({
        type: 'changeTablePageConfig',
        payload: {
          pageSize,
          pageIndex,
        },
      });
    },
    *changeModalForm({ payload }, { put }) {
      yield put({
        type: 'changeEditingInfo',
        payload,
      });
    },
    *fetchList(_, { call, put, select }) {
      const { pageIndex, pageSize: pageNum } = yield select(state => state.tagList);
      const { tags = {}, total } = yield call(fetchList, {
        pageIndex,
        pageNum,
      });

      yield put({
        type: 'queryList',
        payload: {
          list: Object.entries(tags).map(([id, tag]) => ({ id, tag })),
          total,
        },
      });
    },
    *saveAdd({ payload }, { call, put, select }) {
      const { editingInfo } = yield select(state => state.tagList);
      const { isSuccess } = yield call(addTag, { ...editingInfo, ...payload });
      yield put({
        type: 'setModalInfo',
        payload: {
          visible: false,
          editingInfo: defaultEditingInfo,
        },
      });
      return isSuccess;
    },
    *saveEdit({ payload }, { call, put, select }) {
      const { editingInfo } = yield select(state => state.tagList);
      const { isSuccess } = yield call(updateTag, { ...editingInfo, ...payload });
      yield put({
        type: 'setModalInfo',
        payload: {
          visible: false,
          editingInfo: defaultEditingInfo,
        },
      });
      return isSuccess;
    },
    *onEdit({ payload }, { call, put }) {
      yield put({
        type: 'setModalInfo',
        payload: {
          visible: true,
          operation: 1,
        },
      });
      yield put({
        type: 'setModalInfo',
        payload: {
          editingInfo: payload,
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
          editingInfo: defaultEditingInfo,
        },
      });
    },
    *onCancel(_, { put }) {
      yield put({
        type: 'setModalInfo',
        payload: {
          visible: false,
          loading: false,
          editingInfo: defaultEditingInfo,
        },
      });
    },
  },

  reducers: {
    changeTablePageConfig(state, action) {
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
    setModalInfo(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
