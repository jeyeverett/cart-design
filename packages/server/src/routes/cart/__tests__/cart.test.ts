import _ from 'lodash';
import request from 'supertest';

const baseUrl = process.env.BASE_URL as string;

const getCart = async ({ cartId, date }: { date?: Date; cartId: number }) =>
  request(baseUrl).get(`/cart/${cartId}`).send({ date });

const cartItem1 = expect.objectContaining({
  cartId: 1,
  productId: 1,
  productPrice: 10,
  productImageUrl: 'test-url-1',
  status: 'added',
});
const cartItem2 = expect.objectContaining({
  cartId: 1,
  productId: 2,
  productPrice: 10,
  productImageUrl: 'test-url-2',
  status: 'added',
});
const cartItem3 = expect.objectContaining({
  cartId: 1,
  productId: 3,
  productPrice: 10,
  productImageUrl: 'test-url-3',
  status: 'added',
});

describe('cart', () => {
  it('works', async () => {
    const beforeCreateAndDeleteDate = new Date();

    // try adding same item twice (should only add once)
    await request(baseUrl).post('/cart').send({
      cartId: 1,
      productId: 3,
    });
    await request(baseUrl).post('/cart').send({
      cartId: 1,
      productId: 3,
    });

    const responseA = await getCart({ cartId: 1 });
    expect(responseA.body.cart.items.length).toBe(3);
    expect(responseA.body.cart.items).toEqual(
      expect.arrayContaining([cartItem1, cartItem2, cartItem3])
    );

    await request(baseUrl).delete('/cart').send({
      cartId: 1,
      productId: 1,
    });

    const responseB = await getCart({ cartId: 1 });
    const itemsB = responseB.body.cart.items; //?
    // should only have cartItem2 and cartItem3
    expect(itemsB.length).toBe(2);
    expect(_.some(itemsB, (item) => item.productId === 1)).toBe(false);
    expect(itemsB).toEqual(expect.arrayContaining([cartItem2, cartItem3]));

    const responseC = await getCart({
      cartId: 1,
      date: beforeCreateAndDeleteDate,
    });
    const itemsC = responseC.body.cart.items;
    // cartItem1 should be present since "now" is before it was deleted
    // cartItem3 should not be present since "now" is before it was created
    expect(itemsC.length).toBe(2);
    expect(_.some(itemsC, (item) => item.productId === 3)).toBe(false);
    expect(itemsC).toEqual(expect.arrayContaining([cartItem1, cartItem2]));

    const date = new Date();
    const responseD = await getCart({ cartId: 1, date });
    const itemsD = responseD.body.cart.items;
    // cartItem1 should not be present since "now" is after it was deleted
    // cartItem3 should be present since "now" is after it was created
    expect(itemsD.length).toBe(2);
    expect(_.some(itemsD, (item) => item.productId === 1)).toBe(false);
    expect(itemsD).toEqual(expect.arrayContaining([cartItem2, cartItem3]));
  });
});
