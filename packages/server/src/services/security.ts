import bcrypt from 'bcrypt';
import crypto from 'crypto';
import prisma from '@utils/prisma';

export const authenticateUser = async ({
  email,
  accessToken,
}: {
  email: string;
  accessToken: string;
}) => {
  const user = await prisma.user.findUnique({
    where: { email, accessToken },
    select: { id: true, email: true, name: true },
  });
  return user;
};

export const getAccessToken = () => {
  const accessToken = crypto.randomBytes(12).toString('hex');
  return { accessToken };
};

export const hashPassword = async (password: string) => {
  const passwordHash = await bcrypt.hash(password, 12);
  return { passwordHash };
};
