import request from 'supertest';
import ResponseStatus from '@constants/status';

const baseUrl = process.env.BASE_URL as string;

describe('DELETE /users/:id', () => {
  it('deletes a user', async () => {
    const newUser = {
      email: 'jest-delete-test-user@test.com',
      password: 'test-password',
    };
    const createResponse = await request(baseUrl).post('/users').send(newUser); //?
    const { body } = createResponse; //?
    const {
      data: { user },
    } = body;

    const deleteResponse = await request(baseUrl).delete(`/users/${user.id}`); //?
    const deleteStatus = deleteResponse.body.status;
    const deletedUser = deleteResponse.body.data.user;
    expect(deleteStatus).toBe(ResponseStatus.success);
    expect(deletedUser.id).toBe(user.id);

    const response = await request(baseUrl).get(`/users/${user.id}`); //?
    const statusCode = response.statusCode;
    const { status } = response.body; //?
    expect(statusCode).toBe(404);
    expect(status).toBe(ResponseStatus.not_found);
  });
});
