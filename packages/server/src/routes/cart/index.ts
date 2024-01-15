import zodRouter from 'koa-zod-router';
import { deleteFromCart, addToCart, getCart } from '@services/cart';

const router = zodRouter({
  zodRouter: { exposeRequestErrors: true },
});

router.get('/cart/:id', async (ctx) => {
  const { id: passedId } = ctx.params;
  const { date: passedDate } = ctx.request.body;
  const id = Number(passedId);
  const date = passedDate ? new Date(passedDate) : undefined;
  const cart = await getCart({ date, id });
  ctx.body = cart;
});

router.register({
  method: 'post',
  path: '/cart',
  handler: async (ctx) => {
    const { cartId, productId, productPrice, productImageUrl } =
      ctx.request.body;
    const { cartItem } = await addToCart({
      cartId,
      productId,
      productPrice,
      productImageUrl,
    });

    ctx.body = cartItem;
  },
});

router.register({
  method: 'delete',
  path: '/cart',
  handler: async (ctx) => {
    const { cartItemId } = ctx.request.body;
    const { cartItem } = await deleteFromCart({
      cartItemId,
    });

    ctx.body = cartItem;
  },
});
export default router;
