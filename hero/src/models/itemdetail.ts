import { Reducer } from 'redux';
import { Effect } from 'alita';

export interface ItemdetailModelState {
  detail: any;
}

export interface ItemdetailModelType {
  namespace: 'itemdetail';
  state: ItemdetailModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<ItemdetailModelState>;
  };
}

const ItemdetailModel: ItemdetailModelType = {
  namespace: 'itemdetail',

  state: {
    detail: {},
  },

  effects: {
    *fetch({ payload }, { put, select }) {
      const { itemId = '' } = payload;
      const { itemList = [] } = yield select((_: { item: any }) => _.item);
      const detail = itemList.filter((it: any) => it.item_id === JSON.parse(itemId));

      yield put({
        type: 'save',
        payload: {
          detail,
        },
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

export default ItemdetailModel;
