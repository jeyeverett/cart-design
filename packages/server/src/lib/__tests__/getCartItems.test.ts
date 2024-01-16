import _ from 'lodash';
import getCartItems from '@lib/getCartItems';
import { CartItemStatus } from '@prisma/client';
import { cartBase, cart as mockCart } from '@lib/__mocks__/getCartItems.mock';
import dayjs from '@lib/dayjs';

const getMockCart = () => {
  const cart = { ...mockCart, items: _.shuffle(mockCart.items) };
  return cart;
};

describe('getCartItems', () => {
  it('works', () => {
    let id = 5;
    const cart = getMockCart();
    const { cartItems: cartItemsA } = getCartItems({ cart }); //?
    expect(cartItemsA.length).toBe(1);
    expect(cartItemsA[0].id).toBe(5);
    expect(cartItemsA[0].status).toBe(CartItemStatus.added);

    id++;
    cart.items.push({ ...cartBase, id, status: CartItemStatus.removed });
    const { cartItems: cartItemsB } = getCartItems({ cart }); //?
    expect(cartItemsB.length).toBe(0);

    id++;
    cart.items.push({ ...cartBase, id, status: CartItemStatus.added });
    const { cartItems: cartItemsC } = getCartItems({ cart }); //?
    expect(cartItemsC.length).toBe(1);
    expect(cartItemsC[0].id).toBe(7);
    expect(cartItemsC[0].status).toBe(CartItemStatus.added);

    id++;
    cart.items.push({ ...cartBase, id, status: CartItemStatus.removed });
    const { cartItems: cartItemsD } = getCartItems({ cart }); //?
    expect(cartItemsD.length).toBe(0);
  });

  it('works with mixed products', () => {
    let id = 0;
    const cart = { ...mockCart, items: [] };

    id++;
    cart.items.push({
      ...cartBase,
      id,
      productId: 2,
      productPrice: 12,
      productImageUrl: 'test-product-1',
      status: CartItemStatus.added,
      createdAt: dayjs().toDate(),
    });

    id++;
    cart.items.push({
      ...cartBase,
      id,
      productId: 3,
      productPrice: 15,
      productImageUrl: 'test-product-2',
      status: CartItemStatus.added,
      createdAt: dayjs().toDate(),
    });
    const { cartItems: cartItemsA } = getCartItems({ cart }); //?
    expect(cartItemsA.length).toBe(2);
    expect(cartItemsA[0].id).toBe(1);
    expect(cartItemsA[1].id).toBe(2);
    expect(cartItemsA[0].status).toBe(CartItemStatus.added);
    expect(cartItemsA[1].status).toBe(CartItemStatus.added);

    id++;
    cart.items.push({
      ...cartBase,
      id,
      productId: 3,
      productPrice: 15,
      productImageUrl: 'test-product-3',
      status: CartItemStatus.removed,
      createdAt: dayjs().toDate(),
    });
    const { cartItems: cartItemsB } = getCartItems({ cart }); //?
    expect(cartItemsB.length).toBe(1);
    expect(cartItemsB[0].id).toBe(1);
    expect(cartItemsB[0].status).toBe(CartItemStatus.added);

    id++;
    cart.items.push({
      ...cartBase,
      id,
      productId: 4,
      productPrice: 20,
      productImageUrl: 'test-product-4',
      status: CartItemStatus.added,
      createdAt: dayjs().toDate(),
    });
    const { cartItems: cartItemsC } = getCartItems({ cart }); //?
    expect(cartItemsC.length).toBe(2);
    expect(cartItemsC[0].id).toBe(1);
    expect(cartItemsC[1].id).toBe(4);
    expect(cartItemsC[0].status).toBe(CartItemStatus.added);
    expect(cartItemsC[1].status).toBe(CartItemStatus.added);
  });
});
