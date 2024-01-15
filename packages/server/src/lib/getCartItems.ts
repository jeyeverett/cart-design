import _ from 'lodash';
import { CartItem, CartItemStatus } from '@prisma/client';

const getCartItems = ({ items }: { items: CartItem[] }) => {
  const itemsByProduct = _.groupBy(items, 'productId');
  const productsItems = Object.values(itemsByProduct);

  const cartItems = [];
  for (let i = 0; i < productsItems.length; i += 1) {
    const productCartItems = productsItems[i];
    const mostRecentItem = productCartItems[productCartItems.length - 1];
    if (mostRecentItem.status === CartItemStatus.added) {
      cartItems.push(mostRecentItem);
    }
  }

  return { cartItems };
};

export default getCartItems;
