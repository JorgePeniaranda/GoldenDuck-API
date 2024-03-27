import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const newCategory = async (amount: number): Promise<number[]> => {
  const listID = [] as number[];
  for (let i = 0; i < amount; i++) {
    const randomDate = faker.date.past();

    const { id } = await prisma.category.create({
      data: {
        name: faker.string.uuid(),
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
