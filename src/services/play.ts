import {CustomerModel, GameModel} from '../models';

import Logger from '../loaders/logger';
import fetch from 'cross-fetch';
import {randomSlot} from '../utils/randomSlot';

type PlayGameT = {
  id: number;
  attempts: number;
  promocode: string | null;
  discount: 5 | 10 | 15 | null;
  win: boolean;
  slot: string[];
};

export const play = async (customer_id: number): Promise<PlayGameT> => {
  try {
    // Find Or Create Game for Customer
    const record = await GameModel.findOneAndUpdate(
      {customer: customer_id},
      {},
      {
        new: true,
        upsert: true
      }
    );

    const {attempts: previouseAttempts} = record;

    if (previouseAttempts < 3) {
      const {discount: discountFromSlot, slot, win} = randomSlot();
      if (win) {
        // TODO: add to func
        // API PROMOCODE
        const responseVirgo = await fetch(
          // TODO: shop_id to params
          'https://virgo.biptik.com/v1/shops/UHJvamVjdC0x/coupons',
          {
            method: 'POST',
            body: JSON.stringify({discount: discountFromSlot}),
            headers: {'Content-Type': 'application/json'}
          }
        );
        if (responseVirgo.status >= 400) {
          throw new Error('Bad response from Virgo');
        }

        const {id, shop_id, discount} = await responseVirgo.json();

        await CustomerModel.updateOne(
          {_id: customer_id},
          {$push: {promocodes: {promocode: id, shop_id, discount, slot}}}
        );
        await GameModel.updateOne(
          {customer: customer_id},
          {attempts: 3, win: true, promocode: id, discount, slot}
        );
      } else {
        await GameModel.updateOne(
          {customer: customer_id},
          {
            attempts: previouseAttempts + 1,
            win: false,
            promocode: null,
            discount: null,
            slot
          }
        );
      }
    }

    const updatedRecordGame = await GameModel.findOne({
      customer: customer_id
    });

    if (!updatedRecordGame) throw Error('Not found update record Game');

    const {
      _id: id,
      attempts,
      promocode,
      discount,
      slot,
      win
    } = updatedRecordGame.toObject();

    return {id, promocode, attempts, slot, discount, win};
  } catch (error) {
    Logger.error('🔥 Error in srvice - play: ', error);
    throw error;
  }
};
