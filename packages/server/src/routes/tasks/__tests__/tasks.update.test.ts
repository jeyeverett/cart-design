import request from 'supertest';
import ResponseStatus from '@constants/status';

const baseUrl = process.env.BASE_URL as string;

describe('PUT /tasks', () => {
  it('updates a task', async () => {
    const taskToUpdate = {
      id: 1,
      type: 'test',
    };
    const headers = {
      'user-email': 'jest-task-test-user@test.com',
      'access-token': 'accessToken',
    };
    const response = await request(baseUrl)
      .put('/tasks')
      .set(headers)
      .send(taskToUpdate); //?
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

    await request(baseUrl)
      .put('/tasks')
      .set(headers)
      .send({ ...taskToUpdate, type: 'other' }); //?
  });
});
