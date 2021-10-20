import {CustomerI} from '../models';

export type CurrentCustomerGameT = CustomerI & {attempts?: number};
declare global {
  namespace Express {
    export interface Request {
      currentCustomerGame: CurrentCustomerGameT;
    }
  }
}
