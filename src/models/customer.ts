import mongoose from 'mongoose';

export interface CustomerI {
  _id: number;
  promocodes:
    | {
        promocode: string;
        shop_id: string;
        discount: 5 | 10 | 15;
        slot: string[];
      }[]
    | [];
}

// const PromocodeModel = new Schema({ name: String });

export default mongoose.model<CustomerI>(
  'Customer',
  new mongoose.Schema({
    // chat or user id
    _id: Number,
    promocodes: {
      type: [],
      index: true
      // default: () => {
      //   return null;
      // }
    }
  })
);
