import { Reducer } from 'redux';
import { Effect, request } from 'alita';
import { queryHeroList, getHeroDetails } from '@/services/api';

export interface HeroModelState {
  heros: any;
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
  },

  effects: {
    *fetch(_, { call, put }) {
      const herolist = yield call(queryHeroList);
      const herodetails = yield call(getHeroDetails, { ename: 110 });
      console.log(herodetails);
      yield put({
        type: 'save',
        payload: {
          heros: herolist,
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
