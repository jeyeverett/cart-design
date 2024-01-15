import request from 'supertest';
import ResponseStatus from '@constants/status';

const baseUrl = process.env.BASE_URL as string;

describe('POST /users', () => {
  it('creates a new user', async () => {
    const newUser = {
      email: 'jest-create-test-user@test.com',
      password: 'test-password',
    };
    const response = await request(baseUrl).post('/users').send(newUser); //?
    const { body, statusCode } = response; //?
    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        status: ResponseStatus.success,
        data: {
          user: expect.objectContaining({ email: newUser.email }),
        },
      })
    );
    const {
      data: { user },
    } = body;
    await request(baseUrl).delete(`/users/${user.id}`); //?
  });

  it('validates input', async () => {
    const newUser = {
      password: 'test-password',
    };
    const response = await request(baseUrl).post('/users').send(newUser); //?
    const { body, statusCode } = response; //?
    expect(statusCode).toBe(422);
    expect(body).toEqual(
      expect.objectContaining({
        status: ResponseStatus.validation_error,
        data: {
          errors: expect.arrayContaining([
            expect.objectContaining({
              code: 'invalid_type',
              message: 'Required',
              path: 'email',
            }),
          ]),
        },
      })
    );
  });

  it('does not create user if user exists', async () => {
    const newUser = {
      email: 'jest-create-test-user@test.com',
      password: 'test-password',
    };
    const createResponse = await request(baseUrl).post('/users').send(newUser); //?

    const response = await request(baseUrl).post('/users').send(newUser); //?
    const { body, statusCode } = response; //?
    expect(statusCode).toBe(422);
    expect(body).toEqual(
      expect.objectContaining({
        status: ResponseStatus.failed,
        data: {
          errors: [
            {
              message: 'A user with this email already exists.',
              path: 'email',
            },
          ],
        },
      })
    );

    const {
      body: {
        data: { user },
      },
    } = createResponse;
    await request(baseUrl).delete(`/users/${user.id}`); //?
  });
});
