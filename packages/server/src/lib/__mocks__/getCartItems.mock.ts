import { CartItemStatus } from '@prisma/client';
import dayjs from '@lib/dayjs';

export const cartBase = {
  cartId: 1,
  productId: 1,
  productPrice: 10,
  productImageUrl: 'test-product-1',
};

export const cart: any = {
  id: 1,
  items: [
    {
      id: 1,
      ...cartBase,
      status: CartItemStatus.added,
      createdAt: dayjs().toDate(),
    },
    {
      id: 2,
      ...cartBase,
      status: CartItemStatus.removed,
      createdAt: dayjs().add(1, 'minute').toDate(),
    },
    {
      id: 3,
      ...cartBase,
      status: CartItemStatus.added,
      createdAt: dayjs().add(2, 'minute').toDate(),
    },
    {
      id: 4,
      ...cartBase,
      status: CartItemStatus.removed,
      createdAt: dayjs().add(3, 'minute').toDate(),
    },
    {
      id: 5,
      ...cartBase,
      status: CartItemStatus.added,
      createdAt: dayjs().add(4, 'minute').toDate(),
    },
  ],
};
