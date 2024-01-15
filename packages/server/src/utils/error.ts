import Koa from 'koa';
import logger from './logger';

const handleError = (error: any, ctx?: Koa.DefaultContext) => {
  logger.error(error);

  if (!ctx) return;

  ctx.status = error.status || error.statusCode || 500;
  ctx.body = {
    message: 'Internal Server Error',
    error,
  };
};

export default handleError;
