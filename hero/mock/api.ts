import { Request, Response } from 'express';
import herolist from './herolist.json';

export default {
  'POST /api/freeheros.json': (req: Request, res: Response) => {
    const { number } = req.body;
    function getRandomArrayElements(arr, count) {
      const shuffled = arr.slice(0);
      let i = arr.length;
      const min = i - count;
      let temp;
      let index;
      // eslint-disable-next-line no-plusplus
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    }
    const freeheros = getRandomArrayElements(herolist, number);
    res.send(freeheros);
  },
};
