import { getAccessToken, hashPassword } from './security';
import prisma from '@utils/prisma';

export const createUser = async ({
  email,
  name,
  password,
}: {
  email: string;
  name?: string;
  password: string;
}) => {
  const { accessToken } = getAccessToken();
  const { passwordHash } = await hashPassword(password);

  try {
    const user = await prisma.user.create({
      data: {
        accessToken,
        email,
        name,
        passwordHash,
      },
    });
    return { user };
  } catch (err) {
    return {
      errors: [
        {
          message: 'A user with this email already exists.',
          path: 'email',
        },
      ],
    };
  }
};

export const getUsers = async () => {
  const users = await prisma.user.findMany();
  return { users };
};

export const getUserById = async ({ id }: { id: number }) => {
  const user = await prisma.user.findUnique({ where: { id } });
  return { user };
};

export const deleteUserById = async ({ id }: { id: number }) => {
  const user = await prisma.user.delete({ where: { id } });
  return { user };
};
