export type CustomerGameT = {
  // TODO: id to string
  id: number;
  promocodes:
    | {
        promocode: string;
        shop_id: string;
        discount: 5 | 10 | 15;
        slot: string[];
      }[]
    | [];
  attempts?: number;
};
declare global {
  namespace Express {
    export interface Request {
      currentCustomerGame: CustomerGameT;
    }
  }
}
