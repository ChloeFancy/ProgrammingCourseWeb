import {
    getAllOptions,
  } from '@/services/manage/contest';
  
  export default {
    namespace: 'contestDetail',
  
    state: {
        options: {
            cognition: {},
            tags: {},
            difficulty: {},
        },
    },
  
    effects: {
      *getAllOptions({ payload }, { call, put }) {
        const { cognition, tags, difficulty } = yield call(getAllOptions, payload);
        yield put({
          type: 'setOptions',
          payload: {
            cognition,
            tags,
            difficulty,
          },
        });
      },
    },
  
    reducers: {
        setOptions(state, action) {
        return {
          ...state,
          options: {
            ...action.payload,
          },
        };
      },
    },
  };
  