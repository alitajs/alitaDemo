import { Reducer } from 'redux';
import { Effect } from 'alita';
import { queryHeroList, getHeroDetails, queryFreeHeros } from '@/services/api';

export interface HeroModelState {
  heros: any;
  filterKey: number;
  freeheros: any;
  itemHover: number;
}

export interface HeroModelType {
  namespace: 'hero';
  state: HeroModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<HeroModelState>;
  };
}

const HeroModel: HeroModelType = {
  namespace: 'hero',

  state: {
    heros: [],
    filterKey: 0,
    freeheros: [],
    itemHover: 0,
  },

  effects: {
    *fetch(_, { call, put }) {
      const herolist = yield call(queryHeroList);
      const herodetails = yield call(getHeroDetails, { ename: 110 });
      const freeheros = yield call(queryFreeHeros, { number: 13 });

      console.log(herodetails);
      yield put({
        type: 'save',
        payload: {
          heros: herolist,
          freeheros,
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

export default HeroModel;
