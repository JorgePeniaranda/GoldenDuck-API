import { faker } from '@faker-js/faker'
import { prisma } from '../../src/libs/prisma'

export const newCard = async (
  idAccount: number,
  amount: number
): Promise<number[]> => {
  const listID = [] as number[]
  for (let i = 0; i < amount; i++) {
    const randomDate = faker.date.past()

    const { id } = await prisma.card.create({
      data: {
        idAccount,
        number: faker.finance.creditCardNumber({ issuer: 'visa' }),
        cvv: faker.finance.creditCardCVV(),
        expiration: faker.date.future(),
        date: randomDate,
        updatedDate: randomDate
      },
      select: {
        id: true
      }
    })

    listID.push(id)
  }

  return listID
}
