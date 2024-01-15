import request from 'supertest';
import ResponseStatus from '@constants/status';

const baseUrl = process.env.BASE_URL as string;

describe('GET /tasks/:id', () => {
  it('gets a task', async () => {
    const response = await request(baseUrl).get('/tasks/1'); //?
    const {
      body: { data },
      status,
    } = response; //?
    expect(status).toBe(200);
    expect(data).toEqual({
      task: {
        completedAt: null,
        type: 'other',
        user: { email: 'jest-task-test-user@test.com' },
      },
    });
  });
});
