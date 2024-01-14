import zodRouter from 'koa-zod-router';
import { getUsers } from '@services/user';
import validationErrorHandler from '@utils/validation';
import getUserHandler, { GetUserInput } from '@handlers/users/getUser';
import createUserHandler, { CreateUserInput } from '@handlers/users/createUser';
import deleteUserHandler, { DeleteUserInput } from '@handlers/users/deleteUser';

const router = zodRouter({
  zodRouter: { exposeRequestErrors: true, validationErrorHandler },
});

router.get('/users', async (ctx) => {
  const { users } = await getUsers();
  ctx.body = {
    status: 'success',
    data: { users },
  };
});

router.register({
  method: 'get',
  path: '/users/:id',
  handler: getUserHandler,
  validate: {
    params: GetUserInput,
  },
});

router.register({
  method: 'delete',
  path: '/users/:id',
  handler: deleteUserHandler,
  validate: {
    params: DeleteUserInput,
  },
});

router.register({
  method: 'post',
  path: '/users',
  handler: createUserHandler,
  validate: {
    body: CreateUserInput,
  },
});

export default router;
