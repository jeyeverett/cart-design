import _ from 'lodash';
import { CartItemStatus } from '@prisma/client';

export type Cart = {
  id: number;
  items: {
    id: number;
    cartId: number;
    productId: number;
    productPrice: number;
    productImageUrl: string;
    status: CartItemStatus;
    createdAt: Date;
  }[];
} | null;

const getCartItems = ({ cart }: { cart: Cart }) => {
  const sortedItems = _.sortBy(cart?.items, 'createdAt');
  const itemsByProduct = _.groupBy(sortedItems, 'productId');

  const cartItems = [];
  for (const productItems of Object.values(itemsByProduct)) {
    const mostRecentItem = productItems[productItems.length - 1];
    if (mostRecentItem.status === CartItemStatus.added) {
      cartItems.push(mostRecentItem);
    }
  }

  return { cartItems };
};

export default getCartItems;
