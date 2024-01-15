import request from 'supertest';
import ResponseStatus from '@constants/status';

const baseUrl = 'http://localhost:8080';

describe('GET /users/:id', () => {
  it('gets user for a valid id', async () => {
    const id = 1;
    const email = 'jest-get-test-user@test.com';
    const response = await request(baseUrl).get('/users/1'); //?
    const { body, statusCode } = response; //?
    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        status: ResponseStatus.success,
        data: {
          user: expect.objectContaining({ id, email }),
        },
      })
    );
  });

  it('handles non-existing users', async () => {
    const response = await request(baseUrl).get('/users/1111'); //?
    const { body, statusCode } = response; //?
    expect(statusCode).toBe(404);
    expect(body).toEqual(
      expect.objectContaining({
        status: ResponseStatus.not_found,
      })
    );
  });

  it('validates params', async () => {
    const response = await request(baseUrl).get('/users/not-a-param'); //?
    const { body, statusCode } = response; //?
    expect(statusCode).toBe(422);
    expect(body).toEqual(
      expect.objectContaining({
        status: ResponseStatus.validation_error,
        data: {
          errors: expect.arrayContaining([
            expect.objectContaining({ code: 'invalid_type' }),
          ]),
        },
      })
    );
  });
});
