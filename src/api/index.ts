import {Router} from 'express';
import customers from './routes/customers';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  customers(app);
  // agendash(app);

  return app;
};
