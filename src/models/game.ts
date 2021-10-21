import mongoose from 'mongoose';

export interface GameI {
  attempts: number;
  promocode: string | null;
  discount: 5 | 10 | 15 | null;
  slot: string[] | [];
  win: boolean;
  // TODO: any!!!
  createdAt: any;
  customer: any;
}

export default mongoose.model<GameI>(
  'Game',
  new mongoose.Schema({
    attempts: {
      type: Number,
      min: 0,
      max: [3, 'No more attempts'],
      default: 0
    },
    customer: {type: Number, ref: 'Customer'},
    promocode: {
      type: String,
      default: null
    },
    discount: {
      type: Number,
      default: null
    },
    win: {
      type: Boolean,
      default: false
    },
    slot: [String],
    // TODO: add to config!!!
    createdAt: {type: Date, expires: '1d', default: Date.now}
  })
);
