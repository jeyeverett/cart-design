import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // await prisma.user.upsert({
  //   where: { email: 'jest-get-test-user@test.com' },
  //   update: {},
  //   create: {
  //     id: 1,
  //     email: 'jest-get-test-user@test.com',
  //     passwordHash:
  //       '$2b$12$4PwA75s4DQcC2pPKWjmZi.HAqh6hRn7NH7kIo5cUqkZgF9g3nmI4e',
  //     accessToken: 'accessToken',
  //   },
  // });
  // await prisma.user.upsert({
  //   where: { email: 'jest-task-test-user@test.com' },
  //   update: {},
  //   create: {
  //     id: 2,
  //     email: 'jest-task-test-user@test.com',
  //     passwordHash:
  //       '$2b$12$4PwA75s4DQcC2pPKWjmZi.HAqh6hRn7NH7kIo5cUqkZgF9g3nmI4e',
  //     accessToken: 'accessToken',
  //   },
  // });
  // await prisma.task.upsert({
  //   where: { id: 1 },
  //   update: {},
  //   create: {
  //     id: 1,
  //     type: 'other',
  //     userId: 2,
  //   },
  // });
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
