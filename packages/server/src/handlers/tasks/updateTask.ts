import Koa from 'koa';
import { z } from 'zod';
import { TaskType } from '@prisma/client';
import ResponseStatus from '@constants/status';
import { updateTask } from '@services/task';

export const UpdateTaskInput = z.object({
  id: z.coerce.number(),
  type: z.nativeEnum(TaskType),
});

const handler = async (ctx: Koa.DefaultContext) => {
  const { id, type } = ctx.request.body;
  const { errors, task } = await updateTask({ id, type });

  if (errors) {
    ctx.status = 404;
    ctx.body = {
      status: ResponseStatus.failed,
      data: {
        errors,
      },
    };
    return;
  }
  ctx.body = {
    status: ResponseStatus.success,
    data: { task },
  };
};

export default handler;
