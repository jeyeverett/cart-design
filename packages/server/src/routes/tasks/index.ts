import zodRouter from 'koa-zod-router';
import validationErrorHandler from '@utils/validation';
import { getTasks } from '@services/task';
import ResponseStatus from '@constants/status';
import getTask, { GetTaskInput } from '@handlers/tasks/getTask';
import createTask, { CreateTaskInput } from '@handlers/tasks/createTask';
import updateTask, { UpdateTaskInput } from '@handlers/tasks/updateTask';
import deleteTask, { DeleteTaskInput } from '@handlers/tasks/deleteTask';
import { authMiddleware } from '@utils/zod';

const router = zodRouter({
  zodRouter: { exposeRequestErrors: true, validationErrorHandler },
});

router.get('/tasks', async (ctx) => {
  const { tasks } = await getTasks();
  ctx.body = {
    status: ResponseStatus.success,
    data: {
      tasks,
    },
  };
});

router.register({
  method: 'get',
  path: '/tasks/:id',
  handler: getTask,
  validate: {
    params: GetTaskInput,
  },
});

router.use(authMiddleware); // everything below requires auth

router.register({
  method: 'post',
  path: '/tasks',
  handler: createTask,
  validate: {
    body: CreateTaskInput,
  },
});

router.register({
  method: 'put',
  path: '/tasks',
  handler: updateTask,
  validate: {
    body: UpdateTaskInput,
  },
});

router.register({
  method: 'delete',
  path: '/tasks/:id',
  handler: deleteTask,
  validate: {
    params: DeleteTaskInput,
  },
});

export default router;
