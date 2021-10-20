import mongoose from 'mongoose';

export interface CustomerI {
  _id: number;
  promocode: string;
}

export default mongoose.model<CustomerI>(
  'Customer',
  new mongoose.Schema({
    // chat or user id
    _id: Number,
    promocode: {
      type: String,
      index: true
    }
    //   game: {
    //     type: new mongoose.Schema({
    //       attempts: {
    //         type: Number,
    //         min: 0,
    //         max: [3, 'No more attempts'],
    //         default: 0
    //       },
    //       createdAt: {type: Date, expires: 30, default: Date.now}
    //     })
    //   }
  })
);
