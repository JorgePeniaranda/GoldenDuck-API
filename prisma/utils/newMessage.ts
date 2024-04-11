import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const newMessage = async (
  idAccount: number,
  amount: number,
): Promise<number[]> => {
  const listID = [] as number[];
  for (let i = 0; i < amount; i++) {
    const randomDate = faker.date.past();

    const { id } = await prisma.message.create({
      data: {
        idSender: idAccount,
        idReceiver: idAccount,
        message: faker.lorem.text(),
        createdAt: randomDate,
        updatedAt: randomDate,
      },
      select: {
        id: true,
      },
    });

    listID.push(id);
  }

  return listID;
};
