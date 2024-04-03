import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const newNotification = async (
  idAccount: number,
  amount: number,
): Promise<number[]> => {
  const listID = [] as number[];
  for (let i = 0; i < amount; i++) {
    const randomDate = faker.date.past();

    const { id } = await prisma.notification.create({
      data: {
        idAccount,
        message: faker.lorem.text(),
        updatedAt: randomDate,
        createdAt: randomDate,
      },
      select: {
        id: true,
      },
    });

    listID.push(id);
  }

  return listID;
};
