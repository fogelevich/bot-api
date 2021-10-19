import {DB_URL} from '../config';
import mongoose from 'mongoose';

export default async () => await mongoose.connect(DB_URL);
