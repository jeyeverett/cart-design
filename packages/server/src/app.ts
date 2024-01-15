import Koa from 'koa';
import morgan from 'koa-morgan';
import bodyParser from 'koa-bodyparser';
import handleError from '@utils/error';
import router from '@routes/index';
import usersRouter from '@routes/users';
import tasksRouter from '@routes/tasks';
import { authenticateUser } from '@services/security';

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

  app.use(async (ctx: Koa.DefaultContext, next: Koa.Next) => {
    const { 'access-token': accessToken, 'user-email': email } = ctx.headers;

    if (accessToken && email) {
      const user = await authenticateUser({
        accessToken,
        email,
      });
      ctx.state.user = user;
    }

    await next();
  });

  app.use(
    morgan('dev', {
      stream: process.stdout,
    })
  );

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.use(usersRouter.routes());
  app.use(usersRouter.allowedMethods());

  app.use(tasksRouter.routes());
  app.use(tasksRouter.allowedMethods());

  return app;
};

export default getApp;
