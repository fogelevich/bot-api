import mongoose from 'mongoose';

export interface GameI {
  attempts: number;
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
    // TODO: add to config!!!
    createdAt: {type: Date, expires: '1d', default: Date.now}
  })
);
