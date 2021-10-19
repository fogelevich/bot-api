import {API_PREFIX, PORT} from './config';

import Logger from './loaders/logger';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongooseLoader from './loaders/mongoose';
import routes from './api';

async function bootstrap() {
  const app = express();

  // Mongo Db
  await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');
  /**
   * Health Check endpoints
   */
  // app.get('/status', (req, res) => {
  //   res.status(200).end();
  // });
  // app.head('/status', (req, res) => {
  //   res.status(200).end();
  // });

  app.use(helmet());
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());
  // Transforms the raw string of req.body into json
  app.use(express.json());

  // Load API routes
  app.use(API_PREFIX, routes());

  // API Documentation
  // app.use(OpticMiddleware({
  //     enabled: process.env.NODE_ENV !== 'production',
  // }));

  /**
   * Error Handlers
   */
  // catch 404 and forward to error handler
  app.use((_req, _res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  app.use((err, req, res, _next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message
      }
    });
  });

  app
    .listen(PORT, () => {
      Logger.info(`
      ################################################
      🛡️  Server listening on port: ${PORT} 🛡️
      ################################################
    `);
    })
    .on('error', (err) => {
      Logger.error(err);
      process.exit(1);
    });
}

bootstrap();
