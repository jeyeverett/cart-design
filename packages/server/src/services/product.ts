import _ from 'lodash';

type Product = {
  id: number;
  price: number;
  imageUrl: string;
};

const PRODUCTS: Product[] = [
  { id: 1, price: 10, imageUrl: 'test-url-1' },
  { id: 2, price: 10, imageUrl: 'test-url-2' },
  { id: 3, price: 10, imageUrl: 'test-url-3' },
];

const PRODUCTS_BY_ID = _.keyBy(PRODUCTS, 'id');

export const getProduct = ({ id }: { id: number }) => {
  return PRODUCTS_BY_ID[id];
};
