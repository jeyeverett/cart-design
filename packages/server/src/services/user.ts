import _ from 'lodash';
import { getAccessToken, hashPassword } from '@services/security';
import prisma from '@utils/prisma';
import handleError from '@utils/error';

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
        // profile: {
        //   create: {},
        // },
        // posts: {
        //   create: {
        //     title: 'Test post.',
        //     categories: {
        //       connect: {
        //         id: 1,
        //       },
        //     },
        //   },
        // },
      },
    });
    return { user };
  } catch (e) {
    const code = _.get(e, 'code');
    if (code === 'P2002') {
      return {
        errors: [
          {
            message: 'A user with this email already exists.',
            path: 'email',
          },
        ],
      };
    }

    throw e;
  }
};

export const getUsers = async () => {
  const users = await prisma.user.findMany();
  return { users };
};

export const getUserById = async ({ id }: { id: number }) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      profile: true,
      posts: {
        include: {
          categories: true,
        },
      },
    },
  });
  return { user };
};

export const deleteUserById = async ({ id }: { id: number }) => {
  const user = await prisma.user.delete({
    where: { id },
  });
  return { user };
};
