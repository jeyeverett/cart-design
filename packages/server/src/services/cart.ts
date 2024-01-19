import _ from 'lodash';
import { CartItem, CartItemStatus } from '@prisma/client';
import prisma from '@utils/prisma';
import getCartItems from '@lib/getCartItems';
import { getProduct } from '@services/product';

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

export const addToCart = async ({ cartId, productId }: Partial<CartItem>) => {
  const existing = await prisma.cartItem.findFirst({
    where: { cartId, productId },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (existing && existing.status === CartItemStatus.added) {
    return { cartItem: existing };
  }

  const product = getProduct({ id: Number(productId) });

  if (!product) {
    throw new Error(`Product with id ${productId} not found`);
  }

  const cartItem = await prisma.cartItem.create({
    data: {
      cartId: Number(cartId),
      productId: product.id,
      productPrice: product.price,
      productImageUrl: product.imageUrl,
      status: CartItemStatus.added,
    },
  });

  return { cartItem };
};

export const deleteFromCart = async ({
  cartId,
  productId,
}: Partial<CartItem>) => {
  const existing = await prisma.cartItem.findFirst({
    where: { cartId, productId },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (existing && existing.status === CartItemStatus.removed) {
    return { cartItem: existing };
  }

  const product = getProduct({ id: Number(productId) });

  if (!product) {
    throw new Error(`Product with id ${productId} not found`);
  }

  const cartItem = await prisma.cartItem.create({
    data: {
      cartId: Number(cartId),
      productId: product.id,
      productPrice: product.price,
      productImageUrl: product.imageUrl,
      status: CartItemStatus.removed,
    },
  });

  return { cartItem };
};
