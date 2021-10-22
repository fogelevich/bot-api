import mongoose, {Schema} from 'mongoose';

import {EXPIRE_GAME} from '../config';

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

interface GameDocumentI extends GameI, Document {
  toJSONFor: () => GameI & {id: string};
}

const GameSchema: Schema<GameDocumentI> = new mongoose.Schema({
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
  createdAt: {type: Date, expires: EXPIRE_GAME, default: Date.now}
});

// Need population of customer
GameSchema.methods.toJSONFor = function () {
  return {
    id: this._id,
    attempts: this.attempts,
    customer: this.customer,
    promocode: this.promocode,
    discount: this.discount,
    win: this.win,
    slot: this.slot,
    createdAt: this.createdAt
  };
};

export default mongoose.model<GameDocumentI>('Game', GameSchema);
