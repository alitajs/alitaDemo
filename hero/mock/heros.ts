import { Request, Response } from 'express';
import herolist from './herolist.json';

export default {
  '/api/herolist.json': herolist,
  'POST /api/herodetails.json': (req: Request, res: Response) => {
    const { ename } = req.body;
    const hero = herolist.filter((item: any) => item.ename === parseInt(ename, 10))[0];
    res.send(hero);
  },
};
