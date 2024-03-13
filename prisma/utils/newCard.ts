import { faker } from '@faker-js/faker'
import { prisma } from '../../src/libs/prisma'

export const newCard = async (idAccount: number, amount: number): Promise<Array<{ id: number }>> => {
  const listID = []
  for (let i = 0; i < amount; i++) {
    const id = await prisma.card.create({
      data: {
        idAccount,
        number: faker.finance.creditCardNumber({ issuer: 'visa' }),
        cvv: faker.finance.creditCardCVV(),
        expiration: faker.date.future()
      },
      select: {
        id: true
      }
    })

    listID.push(id)
  }

  return listID
}
