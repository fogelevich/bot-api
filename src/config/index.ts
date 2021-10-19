import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

// TODO: string | undefined
export const PORT = parseInt(process.env.PORT as string, 10);

export const LOGS_LEVEL = process.env.LOG_LEVEL || 'silly';

export const API_PREFIX = '/api';
// TODO: string | undefined
export const DB_URL = process.env.MONGODB_URI as string;
