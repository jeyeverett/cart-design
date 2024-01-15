import request from 'supertest';
import ResponseStatus from '@constants/status';

const baseUrl = process.env.BASE_URL as string;

describe('POST /tasks', () => {
  it('creates a task', async () => {
    const taskToCreate = {
      type: 'test',
    };
    const headers = {
      'user-email': 'jest-task-test-user@test.com',
      'access-token': 'accessToken',
    };
    const response = await request(baseUrl)
      .post('/tasks')
      .set(headers)
      .send(taskToCreate); //?
    const { body, status } = response; //?
    expect(status).toBe(200);
    expect(body.status).toBe(ResponseStatus.success);
    expect(body.data).toEqual({
      task: expect.objectContaining({
        userId: 2,
        type: 'test',
        completedAt: null,
      }),
    });

    const {
      data: { task },
    } = body;
    const checkResponse = await request(baseUrl).get(`/tasks/${task.id}`);
    expect(checkResponse.body.status).toBe(ResponseStatus.success);
    expect(checkResponse.body.data).toEqual({
      task: expect.objectContaining({
        completedAt: null,
        type: 'test',
        user: { email: 'jest-task-test-user@test.com' },
      }),
    });

    await request(baseUrl).delete(`/tasks/${task.id}`).set(headers);
  });
});
