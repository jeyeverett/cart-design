import request from 'supertest';
import dayjs from '@lib/dayjs';
import _ from 'lodash';

const baseUrl = process.env.BASE_URL as string;

describe('cart', () => {
  it('works if provided a date', async () => {
    const now = dayjs().format();

    // add an additional item to the cart
    await request(baseUrl).post('/cart').send({
      cartId: 1,
      productId: 3,
      productPrice: 10,
      productImageUrl: 'test-url-3',
    });

    // cart should contain 3 items
    const response = await request(baseUrl).get('/cart/1');
    const { body } = response;
    expect(body).toEqual(
      expect.objectContaining({
        cart: {
          id: 1,
          items: [
            expect.objectContaining({
              id: 1,
              cartId: 1,
              productId: 1,
              productPrice: 10,
              productImageUrl: 'test-url-1',
              status: 'added',
            }),
            expect.objectContaining({
              id: 2,
              cartId: 1,
              productId: 2,
              productPrice: 10,
              productImageUrl: 'test-url-2',
              status: 'added',
            }),
            expect.objectContaining({
              cartId: 1,
              productId: 3,
              productPrice: 10,
              productImageUrl: 'test-url-3',
              status: 'added',
            }),
          ],
        },
      })
    );

    // delete the first item in the cart
    await request(baseUrl).delete('/cart').send({ cartItemId: 1 });

    // response should still include the first item since it was deleted after the date cutoff but should not include the third item
    const checkResponse = await request(baseUrl)
      .get('/cart/1')
      .send({ date: now });
    expect(checkResponse.body).toEqual(
      expect.objectContaining({
        cart: {
          id: 1,
          items: [
            expect.objectContaining({
              id: 1,
              cartId: 1,
              productId: 1,
              productPrice: 10,
              productImageUrl: 'test-url-1',
              status: 'added',
            }),
            expect.objectContaining({
              id: 2,
              cartId: 1,
              productId: 2,
              productPrice: 10,
              productImageUrl: 'test-url-2',
              status: 'added',
            }),
          ],
        },
      })
    );
    const {
      body: {
        cart: { items },
      },
    } = checkResponse;
    expect(items.length).toBe(2);
    const hasInvalidItem = _.some(items, (item) => item.id === 3);
    expect(hasInvalidItem).toBe(false);
  });
});
