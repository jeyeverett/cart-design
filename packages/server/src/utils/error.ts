import Koa from 'koa';
import ResponseStatus from '@constants/status';
import logger from './logger';

const handleError = (err: any, ctx?: Koa.DefaultContext) => {
  const details = `Caught error ${err.status || 500} "${err.message}"`;
  logger.error(details);

  if (!ctx) return;

  ctx.status = err.status || err.statusCode || 500;
  ctx.body = {
    status: ResponseStatus.failed,
    message: 'Internal Server Error',
  };
};

export default handleError;
