import {GameModel} from '../models';

const play = async (id: number) => {
  try {
    const record = await GameModel.findOne({customer: id});

    console.log(record);

    if (!record) {
      const newRecord = await GameModel.create({
        attempts: 1,
        customer: id
      });
      await newRecord.save();
      console.log(newRecord);
    }

    console.log(record);

    // const currentAttempts = record.game?.attempts;
    // if (!currentAttempts) {
    //   record.game = {attempts: 1};
    // } else if (currentAttempts !== 3) {
    //   record.game = {attempts: currentAttempts + 1};
    // }

    // await record.save();

    // console.log(await GameModel.findOne({customer: id}).populate('customer'));

    // return record.toObject();
  } catch (err) {
    console.log(err);
    return {};
  }
  // try {
  //   const record = await CustomerModel.findById(id);

  //   if (!record) throw Error('Not Found');

  //   const currentAttempts = record.game?.attempts;
  //   if (!currentAttempts) {
  //     record.game = {attempts: 1};
  //   } else if (currentAttempts !== 3) {
  //     record.game = {attempts: currentAttempts + 1};
  //   }

  //   await record.save();

  //   return record.toObject();
  // } catch (err) {
  //   console.log(err);
  //   return {};
  // }
};

export {play};
