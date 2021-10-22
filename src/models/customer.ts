import mongoose, {Schema} from 'mongoose';

interface CustomerI {
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

type CustomerJSONT = {id: number} & Omit<CustomerI, '_id'>;

interface CustomerDocumentI extends CustomerI {
  toJSONFor: () => CustomerJSONT;
}

const CustomerSchema = new Schema<CustomerDocumentI>({
  _id: Number,
  promocodes: {
    type: [],
    index: true
  }
});

CustomerSchema.methods.toJSONFor = function () {
  return {
    id: this._id,
    promocodes: this.promocodes
  };
};

const Customer = mongoose.model<CustomerDocumentI>('Customer', CustomerSchema);

export default Customer;
