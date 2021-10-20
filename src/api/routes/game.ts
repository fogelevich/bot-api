import {Request, Response, Router} from 'express';

import {play} from '../../services';

const route = Router();

export default (app: Router) => {
  app.use('/game', route);

  route.post('/play/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      // play
      const result = await play(id);

      return res.json(result).status(200);
    } catch (error) {
      res.status(500).send(error);
    }
  });
};
