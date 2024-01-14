import Koa from 'koa';
import { z } from 'zod';
import ResponseStatus from '@constants/status';
import { deleteUserById } from '@services/user';

export const DeleteUserInput = z.object({
  id: z.coerce.number(),
});

const handler = async (ctx: Koa.DefaultContext) => {
  const { id } = ctx.params;
  const { user } = await deleteUserById({ id });
  ctx.body = {
    status: ResponseStatus.success,
    data: { user },
  };
};

export default handler;
