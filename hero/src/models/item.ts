import { Reducer } from 'redux';
import { queryItemList } from '@/services/api';
import { Effect } from 'alita';

export interface ItemModelState {
  itemList: any;
  filterKey: number;
}

export interface ItemModelType {
  namespace: 'item';
  state: ItemModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<ItemModelState>;
  };
}

const ItemModel: ItemModelType = {
  namespace: 'item',

  state: {
    itemList: [],
    filterKey: 0,
  },

  effects: {
    *fetch(_, { call, put }) {
      const data = yield call(queryItemList);
      yield put({
        type: 'save',
        payload: { itemList: data },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default ItemModel;
