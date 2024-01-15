import Koa from 'koa';
import { z } from 'zod';
import ResponseStatus from '@constants/status';
import { deleteTaskById } from '@services/task';

export const DeleteTaskInput = z.object({
  id: z.coerce.number(),
});

const handler = async (ctx: Koa.DefaultContext) => {
  const { id } = ctx.params;
  const { task } = await deleteTaskById({ id });

  ctx.body = {
    status: ResponseStatus.success,
    data: { task },
  };
};

export default handler;
