import Koa from 'koa';
import Router from 'koa-router';
import dayjs from '@lib/dayjs';

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = 'Hello World!';
});

router.get('/error', () => {
  throw new Error('/error');
});

router.get('/errorPromise', () => {
  new Promise((_resolve, _reject) => {
    throw new Error('/errorPromise');
  });
});

router.get('/status', async (ctx: Koa.DefaultContext) => {
  const {
    request: { headers },
    state: { user },
  } = ctx;
  const date = dayjs().format();
  const data = {
    date,
    user: {},
    request: {
      headers,
    },
  };

  if (user) {
    data.user = {
      email: user.email,
    };
  }

  ctx.status = 200;
  ctx.body = data;
});

export default router;
