import Koa from 'koa';
import ResponseStatus from '@constants/status';
import logger from './logger';

const handleError = (error: any, ctx?: Koa.DefaultContext) => {
  logger.error(error);

  if (!ctx) return;

  ctx.status = error.status || error.statusCode || 500;
  ctx.body = {
    status: ResponseStatus.failed,
    message: 'Internal Server Error',
    error,
  };
};

export default handleError;
