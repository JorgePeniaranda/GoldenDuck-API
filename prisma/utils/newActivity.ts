import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const newActivity = async (
  idUser: number,
  amount: number,
): Promise<number[]> => {
  const listID = [] as number[];
  for (let i = 0; i < amount; i++) {
    const { id } = await prisma.activity.create({
      data: {
        idUser,
        action: faker.helpers.arrayElement([
          'GET',
          'POST',
          'PUT',
          'PATCH',
          'DELETE',
        ]),
        details: faker.lorem.text(),
      },
      select: {
        id: true,
      },
    });

    listID.push(id);
  }

  return listID;
};
