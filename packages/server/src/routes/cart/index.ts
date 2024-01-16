import Router from 'koa-router';
import { deleteFromCart, addToCart, getCart } from '@services/cart';

const router = new Router();

router.get('/cart/:id', async (ctx) => {
  const { id: passedId } = ctx.params;
  const { date: passedDate } = ctx.request.body;
  const id = Number(passedId);
  const date = passedDate ? new Date(passedDate) : undefined;
  const cart = await getCart({ date, id });
  ctx.body = cart;
});

router.post('/cart', async (ctx) => {
  const { cartId, productId, productPrice, productImageUrl } = ctx.request.body;
  const { cartItem } = await addToCart({
    cartId,
    productId,
    productPrice,
    productImageUrl,
  });

  ctx.body = cartItem;
});

router.delete('/cart', async (ctx) => {
  const { cartItemId } = ctx.request.body;
  const { cartItem } = await deleteFromCart({
    cartItemId,
  });

  ctx.body = cartItem;
});

export default router;
