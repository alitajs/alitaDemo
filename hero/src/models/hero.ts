import { Reducer } from 'redux';
import { Effect, request } from 'alita';

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
    *fetch(_, { put }) {
      const data = yield request('/api/herolist.json');
      const localData = [
        {
          ename: 105,
          cname: '廉颇',
          title: '正义爆轰',
          new_type: 0,
          hero_type: 3,
          skin_name: '正义爆轰|地狱岩魂',
        },
        {
          ename: 106,
          cname: '小乔',
          title: '恋之微风',
          new_type: 0,
          hero_type: 2,
          skin_name: '恋之微风|万圣前夜|天鹅之梦|纯白花嫁|缤纷独角兽',
        },
      ];
      const detail = yield request('/api/herodetails.json', {
        method: 'POST',
        body: JSON.stringify({
          ename: 110,
        }),
      });
      console.log(detail);
      yield put({
        type: 'save',
        payload: {
          heros: data || localData,
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
