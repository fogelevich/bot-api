import mongoose from 'mongoose';

export interface CustomerI {
  _id: string;
  customer_id: number;
  promocode: string;
  attempts: number;
}

const Customer = new mongoose.Schema(
  {
    // chat or user id
    customer_id: {
      type: Number,
      required: [true, 'Please, enter id'],
      index: true,
      unique: true
    },
    promocode: {
      type: String,
      index: true
    },
    attempts: {
      type: Number,
      min: 0,
      max: [3, 'No more attempts'],
      default: 0
    }
  },
  {timestamps: true}
);

export default mongoose.model<CustomerI & mongoose.Document>(
  'Customer',
  Customer
);
