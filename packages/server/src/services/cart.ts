import _ from 'lodash';
import prisma from '@utils/prisma';
import getCartItems from '@lib/getCartItems';
import { CartItemStatus } from '@prisma/client';

export const getCart = async ({ date, id }: { date?: Date; id: number }) => {
  const itemsWhere = date ? { createdAt: { lte: date } } : {};
  const cart = await prisma.cart.findUnique({
    where: { id },
    select: {
      id: true,
      items: {
        where: itemsWhere,
      },
    },
  });

  if (!cart) return { cart };

  const { cartItems } = getCartItems({ cart });
  return { cart: { id: cart.id, items: cartItems } };
};

export const addToCart = async ({
  cartId,
  productId,
  productPrice,
  productImageUrl,
}: {
  cartId: number;
  productId: number;
  productPrice: number;
  productImageUrl: string;
}) => {
  const existing = await prisma.cartItem.findFirst({
    where: { cartId, productId, productPrice, productImageUrl },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (existing && existing.status === CartItemStatus.added) {
    return { cartItem: existing };
  }

  const cartItem = await prisma.cartItem.create({
    data: {
      cartId,
      productId,
      productPrice,
      productImageUrl,
      status: CartItemStatus.added,
    },
  });

  return { cartItem };
};

export const deleteFromCart = async ({
  cartItemId,
}: {
  cartItemId: number;
}) => {
  const existingItem = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
  });

  if (existingItem && existingItem.status === CartItemStatus.added) {
    const { cartId, productId, productPrice, productImageUrl } = existingItem;
    const cartItem = await prisma.cartItem.create({
      data: {
        cartId,
        productId,
        productPrice,
        productImageUrl,
        status: CartItemStatus.removed,
      },
    });

    return { cartItem };
  }

  return { cartItem: existingItem };
};
