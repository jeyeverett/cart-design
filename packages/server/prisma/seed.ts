import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'jest-cart-test-user@test.com' },
    update: {},
    create: {
      id: 1,
      email: 'jest-cart-test-user@test.com',
      passwordHash:
        '$2b$12$4PwA75s4DQcC2pPKWjmZi.HAqh6hRn7NH7kIo5cUqkZgF9g3nmI4e',
      accessToken: 'accessToken',
    },
  });

  await prisma.cart.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      userId: 1,
    },
  });

  await prisma.cartItem.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      cartId: 1,
      productId: 1,
      productPrice: 10,
      productImageUrl: 'test-url-1',
      status: 'added',
    },
  });

  await prisma.cartItem.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      cartId: 1,
      productId: 2,
      productPrice: 10,
      productImageUrl: 'test-url-2',
      status: 'added',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
