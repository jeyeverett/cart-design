import request from 'supertest';
import ResponseStatus from '@constants/status';

const baseUrl = process.env.BASE_URL as string;

describe('DELETE /tasks', () => {
  it('deletes a task', async () => {
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
    const { body } = response; //?
    const {
      data: { task },
    } = body;

    await request(baseUrl).delete(`/tasks/${task.id}`).set(headers);

    const checkResponse = await request(baseUrl).get(`/tasks/${task.id}`);
    expect(checkResponse.body.status).toBe(ResponseStatus.not_found);
    expect(checkResponse.body.data).toBe(undefined);
  });
});
