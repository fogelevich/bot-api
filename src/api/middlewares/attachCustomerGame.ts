import {CustomerModel, GameModel} from '../../models';
import {Request, Response} from 'express';

import {CurrentCustomerGameT} from '../../types';
import Logger from '../../loaders/logger';

/**
 * Attach customer to req
 */
const attachCurrentCustomerGame = async (req: Request, res: Response, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    // Find or Create Customer to attach
    let customerRecord = await CustomerModel.findById(id);
    if (!customerRecord && id) {
      customerRecord = await CustomerModel.create({
        _id: id
      });
    }

    if (!customerRecord) throw Error('Create new customer');

    // Customer Object
    const currentCustomerGame: CurrentCustomerGameT = customerRecord.toObject();

    // Attach Game if document for user exist
    const gameRecord = await GameModel.findOne({customer: id})
      .populate('customer')
      .exec();

    if (gameRecord) {
      currentCustomerGame.attempts = gameRecord.toObject().attempts;
    }

    req.currentCustomerGame = {...currentCustomerGame};
    return next();
  } catch (error) {
    Logger.error('🔥 Error attaching customer to req: ', error);
    return next(error);
  }
};

export default attachCurrentCustomerGame;
