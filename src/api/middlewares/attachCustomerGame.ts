import {CustomerModel, GameModel} from '../../models';
import {Request, Response} from 'express';

import Logger from '../../loaders/logger';

/**
 * Attach customer to req
 */
const attachCurrentCustomerGame = async (req: Request, res: Response, next) => {
  try {
    const paramsId = parseInt(req.params.id, 10);

    //  TODO: add to methods service
    // Find or Create Customer to attach
    const customerRecord = await CustomerModel.findOneAndUpdate(
      {_id: paramsId},
      {},
      {
        new: true,
        upsert: true // Make this update into an upsert
      }
    );

    if (!customerRecord) throw Error('Create or find customer');

    // Customer Object
    const {id, promocodes} = customerRecord.toJSONFor();

    //  TODO: add to methods service
    // Attach Game if document for user exist
    const gameRecord = await GameModel.findOne({customer: paramsId}).populate(
      'customer'
    );
    const {attempts = 0} = gameRecord?.toObject() || {};

    req.currentCustomerGame = {id, promocodes, attempts};
    return next();
  } catch (error) {
    Logger.error('🔥 Error attaching customer to req: ', error);
    return next(error);
  }
};

export default attachCurrentCustomerGame;
