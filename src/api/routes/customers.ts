import {Request, Response, Router} from 'express';

import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/customers', route);

  route.get(
    '/:id',
    middlewares.attachCurrentCustomerGame,
    async (req: Request, res: Response) => {
      return res.json({customer: req.currentCustomerGame}).status(200);
    }
  );
};
