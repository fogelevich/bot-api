import {Request, Response} from 'express';

import {CustomerModel} from '../../models';
import Logger from '../../loaders/logger';

/**
 * Attach customer to req
 */
const attachCurrentCustomer = async (req: Request, res: Response, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    let customerRecord = await CustomerModel.findOne({customer_id: id});

    if (!customerRecord && id) {
      customerRecord = await CustomerModel.create({
        customer_id: id
      });
    }

    if (!customerRecord) throw Error('Create new customer');

    const currentCustomer = customerRecord.toObject();
    req.currentCustomer = currentCustomer;
    return next();
  } catch (error) {
    Logger.error('🔥 Error attaching customer to req: ', error);
    return next(error);
  }
};

export default attachCurrentCustomer;
