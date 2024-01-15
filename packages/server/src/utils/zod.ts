import Koa from 'koa';
import { z } from 'zod';
import { routerSpecFactory } from 'koa-zod-router';
import { authenticateUser } from '@services/security';

export type UserState = {
  user: {
    id: number;
    email: string;
    name: string | null;
  };
};

export const specFactory = routerSpecFactory<UserState>();

export const authMiddleware = specFactory.createUseSpec({
  handler: async (ctx: Koa.DefaultContext, next) => {
    const { 'access-token': accessToken, 'user-email': email } = ctx.headers;

    const user = await authenticateUser({
      accessToken,
      email,
    });

    if (user) ctx.state.user = user;

    await next();
  },
  validate: {
    headers: z.object({ 'access-token': z.string(), 'user-email': z.string() }),
  },
});
