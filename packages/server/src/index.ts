import path from 'path';
import dotenv from 'dotenv';
import logger from './utils/logger';
import getApp from './app';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const PORT = 8080;

const main = async () => {
  logger.info('Starting server...');

  logger.info(`DATABASE_URL: ${process.env.DATABASE_URL}`);

  const app = await getApp();
  app.listen(PORT);

  logger.info(`Listening on port ${PORT}`);
};

main();
