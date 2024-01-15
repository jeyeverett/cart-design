import Koa from 'koa';
import { z } from 'zod';
import { TaskType } from '@prisma/client';
import ResponseStatus from '@constants/status';
import { createTask } from '@services/task';

export const CreateTaskInput = z.object({
  type: z.nativeEnum(TaskType),
});

const handler = async (ctx: Koa.DefaultContext) => {
  const { type } = ctx.request.body;
  const {
    user: { id: userId },
  } = ctx.state;
  const { task } = await createTask({ type, userId });

  ctx.body = {
    status: ResponseStatus.success,
    data: { task },
  };
};

export default handler;
