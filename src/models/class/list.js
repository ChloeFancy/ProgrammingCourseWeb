import {
  // fetchList,
  getClassByID,
  editClass,
  addClass,
  searchClass,
  applyEnterClass,
  quitClass,
  getMyClass,
} from '@/services/manage/class';
import { formatObjectToFields, formatRequestFromFields } from '../../lib/form';

export default {
  namespace: 'classList',

  state: {
    // 班级表格
    tableLoading: false,
    list: [], // 列表
    total: 0, // 总数

    // 搜索参数
    keyword: undefined, // 题目搜索关键字
    pageSize: 10,
    pageIndex: 1,

    // 对话框
    info: {},
    modalVisible: false,
    modalLoading: false,
    operation: 0, // 0 - 新增 1 - 编辑

    // 学生 -- 我的班级
    myClassVisible: false,
    myClassDataSource: [],
    myClassLoading: false,
  },

  effects: {
    *quitMyClass({ payload }, { call }) {
      const { isSuccess } = yield call(quitClass, { classId: payload.id });
      return isSuccess;
    },
    *closeMyClass(_, { put }) {
      yield put({
        type: 'modifyMyClassModal',
        payload: {
          myClassVisible: false,
          myClassLoading: false,
          myClassDataSource: [],
        },
      });
    },
    *showMyClass(_, { call, put, select }) {
      const { user: { id: userId } } = yield select(state => state.login);
      yield put({
        type: 'modifyMyClassModal',
        payload: {
          myClassVisible: true,
          myClassLoading: true,
        },
      });
      const { classes } = yield call(getMyClass, { userId });
      yield put({
        type: 'modifyMyClassModal',
        payload: {
          myClassDataSource: Array.isArray(classes) ? classes : [],
          myClassLoading: false,
        },
      });
    },
    *applyJoinClass({ payload }, { call }) {
      const { isSuccess } = yield call(applyEnterClass, {
        classId: payload.id,
      });
      return isSuccess;
    },
    *changeModalForm({ payload }, { put }) {
      yield put({
        type: 'changeEditingInfo',
        payload,
      });
    },
    *closeModal(_, { put }) {
      yield put({
        type: 'setModalInfo',
        payload: {
          info: {},
          modalVisible: false,
          modalLoading: false,
          operation: 0,
        },
      });
    },
    *classSubmit(_, { call, select }) {
      const { operation, info } = yield select(state => state.classList);

      yield call(operation ? editClass : addClass, {
        class: formatRequestFromFields({
          ...info,
        }),
      });
    },
    *openModal({ payload }, { call, put }) {
      yield put({
        type: 'setModalInfo',
        payload: {
          modalVisible: true,
          operation: payload.operation,
        },
      });
      if(payload && payload.id) {
        yield put({
          type:'setLoading',
          payload: {
            modalLoading: true,
          },
        });
        const { id } = payload;
        const { class: info } = yield call(getClassByID, { id });
        yield put({
          type: 'setModalInfo',
          payload: {
            info: formatObjectToFields(info),
          },
        });
        yield put({
          type:'setLoading',
          payload: {
            modalLoading: false,
          },
        });
      }
    },
    *fetchList(_, { select, call, put }) {
      yield put({
        type:'setLoading',
        payload: {
          tableLoading: true,
        },
      });
      const { pageIndex, pageSize, keyword } = yield select(state => state.classList);
      const { classes, total } = yield call(searchClass, {
        pageIndex,
        pageNum: pageSize,
        keyword,
      });
      yield put({
        type: 'queryList',
        payload: {
          list: Array.isArray(classes) ? classes : [],
          total,
        }
      });
      yield put({
        type:'setLoading',
        payload: {
          tableLoading: false,
        },
      });
    },
    *setSearchParams({ payload }, { put }) {
      yield put({
        type: 'changeSearchParams',
        payload,
      });
    }
  },

  reducers: {
    changeEditingInfo(state, action) {
      return {
        ...state,
        info: {
          ...state.info,
          ...action.payload,
        },
      };
    },
    modifyMyClassModal(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setModalInfo(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    changeSearchParams(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    queryList(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setLoading(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
