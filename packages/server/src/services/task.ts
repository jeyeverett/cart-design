import prisma from '@utils/prisma';
import { TaskType } from '@prisma/client';
import handleError from '@utils/error';
import ResponseStatus from '@constants/status';

export const getTasks = async () => {
  const tasks = await prisma.task.findMany();
  return { tasks };
};

export const getTaskById = async ({ id }: { id: number }) => {
  const task = await prisma.task.findUnique({
    where: { id },
    select: {
      type: true,
      completedAt: true,
      user: {
        select: {
          email: true,
        },
      },
    },
  });
  return { task };
};

export const createTask = async ({
  type,
  userId,
}: {
  type: TaskType;
  userId: number;
}) => {
  const task = await prisma.task.create({
    data: {
      type,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return { task };
};

export const updateTask = async ({
  id,
  type,
}: {
  id: number;
  type: TaskType;
}) => {
  try {
    const task = await prisma.task.update({
      where: { id },
      data: { type },
    });
    return { task };
  } catch (e) {
    handleError(e);
    return {
      errors: [
        {
          status: ResponseStatus.not_found,
          message: `Could not a find a task with id ${id}.`,
        },
      ],
    };
  }
};

export const deleteTaskById = async ({ id }: { id: number }) => {
  try {
    const task = await prisma.task.delete({
      where: { id },
    });
    return { task };
  } catch (e) {
    return { task: null }; // if task doesn't exist, just return null
  }
};
