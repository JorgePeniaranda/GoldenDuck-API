import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const newTransaction = async (
  idUser: number,
  amount: number,
): Promise<number[]> => {
  const listID = [] as number[];
  for (let i = 0; i < amount; i++) {
    const randomDate = faker.date.past();

    const { id } = await prisma.transaction.create({
      data: {
        from: idUser,
        to: idUser,
        amount: faker.number.int({
          min: 0,
          max: 100000,
        }),
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
