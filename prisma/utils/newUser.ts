import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import { $Enums, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// enum sex {
//   MALE = "MALE",
//   FELAME = "FELAME"
// }

// enum role{
//   ADMIN = "ADMIN",
//   USER = "USER",
//   SUPPORT = "SUPPORT"
// }

// const $Enums = {
//   sex,
//   role
// }

export const newUser = async (amount: number): Promise<number[]> => {
  const listID = [] as number[];
  for (let i = 0; i < amount; i++) {
    const randomDate = faker.date.past();
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync('¿¡TEST123test!?', salt); // faker.internet.password()

    const { id } = await prisma.user.create({
      data: {
        name: faker.person.firstName(),
        dni: faker.number.bigInt({
          min: 10000000,
          max: 99999999,
        }),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.number.bigInt({
          min: 1000000000,
          max: 9999999999,
        }),
        password,
        salt,
        address: faker.location.streetAddress(),
        birthDate: faker.date.birthdate(),
        sex: faker.helpers.enumValue($Enums.sex),
        role: faker.helpers.enumValue($Enums.role),
        updatedAt: randomDate,
        createdAt: randomDate,
        actived: true, // faker.datatype.boolean()
      },
      select: {
        id: true,
      },
    });

    listID.push(id);
  }

  return listID;
};
