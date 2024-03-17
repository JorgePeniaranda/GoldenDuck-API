import { faker } from '@faker-js/faker'
import { prisma } from '../../src/libs/prisma'
import { $Enums } from '@prisma/client'

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

export const newUser = async (amount: number): Promise<Array<number>> => {
  const listID = [] as Array<number>
  for (let i = 0; i < amount; i++) {
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
        password: faker.internet.password(),
        address: faker.location.streetAddress(),
        birthDate: faker.date.birthdate(),
        sex: faker.helpers.enumValue($Enums.sex),
        role: faker.helpers.enumValue($Enums.role),
      },
      select: {
        id: true,
      },
    })

    listID.push(id)
  }

  return listID
}
