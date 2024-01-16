import _ from 'lodash';
import { CartItem, CartItemStatus } from '@prisma/client';

// take the items from a users cart and return the most recent one for each product IF status === "added"
const getCartItems = ({ items }: { items: CartItem[] }) => {
  const sortedItems = _.sortBy(items, 'createdAt');
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
