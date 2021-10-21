import {Request, Response, Router} from 'express';

import middlewares from '../middlewares';
import {play} from '../../services';

const route = Router();

export default (app: Router) => {
  app.use('/game', route);

  route.post(
    '/play/:id',
    middlewares.attachCurrentCustomerGame,
    async (req: Request, res: Response) => {
      try {
        // play
        const result = await play(req.currentCustomerGame.id);

        return res.json(result).status(200);
      } catch (error) {
        res.status(500).send(error);
      }
    }
  );
};
