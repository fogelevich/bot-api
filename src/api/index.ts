import {Router} from 'express';
import customers from './routes/customers';
import game from './routes/game';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  customers(app);
  game(app);
  // agendash(app);

  return app;
};
