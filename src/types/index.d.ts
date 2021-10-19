import {CustomerI} from '../models';

declare global {
  namespace Express {
    export interface Request {
      currentCustomer: CustomerI;
    }
  }
}
