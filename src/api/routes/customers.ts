import {Request, Response, Router} from 'express';

import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/customers', route);

  route.get(
    '/:id',
    middlewares.attachCurrentCustomer,
    async (req: Request, res: Response) => {
      return res.json({customer: req.currentCustomer}).status(200);
    }
  );

  // route.post('/play/:id', async (req: Request, res: Response) => {
  //   // const id = parseInt(req.params.id, 10);
  //   try {
  //     // play
  //     // const newItem = await GameService.create(item);

  //     // res.status(201).json(newItem);
  //     return res.json({good: true}).status(200);
  //   } catch (error) {
  //     // res.status(500).send(e.message);
  //   }
  // });
};
