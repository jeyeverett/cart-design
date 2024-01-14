import Koa from 'koa';
import { z } from 'zod';
import ResponseStatus from '@constants/status';
import { createUser } from '@services/user';

export const CreateUserInput = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  password: z.string().min(8),
});

const handler = async (ctx: Koa.DefaultContext) => {
  const { email, name, password } = ctx.request.body;
  const { errors, user } = await createUser({ email, name, password });

  if (errors) {
    ctx.status = 422;
    ctx.body = {
      status: ResponseStatus.failed,
      data: { errors },
    };
    return;
  }

  ctx.body = {
    status: ResponseStatus.success,
    data: { user },
  };
};

export default handler;
