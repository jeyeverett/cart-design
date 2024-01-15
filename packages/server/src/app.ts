import Koa from 'koa';
import morgan from 'koa-morgan';
import bodyParser from 'koa-bodyparser';
import handleError from '@utils/error';
import cartRouter from '@routes/cart';

let app: Koa.DefaultState;
const getApp = async () => {
  if (app) return app;

  app = new Koa();
  app.proxy = true;

  app.on('error', (err: any) => {
    handleError(err);
  });

  app.use(async (ctx: Koa.DefaultContext, next: Koa.Next) => {
    try {
      await next();
    } catch (err: any) {
      handleError(err, ctx);
    }
  });

  app.use(bodyParser());

  app.use(
    morgan('dev', {
      stream: process.stdout,
    })
  );

  app.use(cartRouter.routes());
  app.use(cartRouter.allowedMethods());

  return app;
};

export default getApp;
