import Koa from 'koa';
import { z } from 'zod';
import ResponseStatus from '@constants/status';
import { getTaskById } from '@services/task';

export const GetTaskInput = z.object({
  id: z.coerce.number(),
});

const handler = async (ctx: Koa.DefaultContext) => {
  const { id } = ctx.params;
  const { task } = await getTaskById({ id });

  if (!task) {
    ctx.status = 404;
    ctx.body = {
      status: ResponseStatus.not_found,
    };
    return;
  }

  ctx.body = {
    status: ResponseStatus.success,
    data: { task },
  };
};

export default handler;
