import Koa from 'koa';
import { z } from 'zod';
import ResponseStatus from '@constants/status';
import { getUserById } from '@services/user';

export const GetUserInput = z.object({
  id: z.coerce.number(),
});

const handler = async (ctx: Koa.DefaultContext) => {
  const { id } = ctx.params;
  const { user } = await getUserById({ id });

  if (!user) {
    ctx.status = 404;
    ctx.body = {
      status: ResponseStatus.not_found,
    };
    return;
  }

  ctx.body = {
    status: ResponseStatus.success,
    data: { user },
  };
};

export default handler;
