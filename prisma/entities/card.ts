import { faker } from '@faker-js/faker'
import { type Card, type PrismaClient } from '@prisma/client'
import { PrismaParams, type PrismaWithoutID } from '../PrismaParams'

export class PrismaCard implements PrismaWithoutID<Card> {
  readonly idAccount: Card['idAccount']
  readonly number: Card['number']
  readonly cvv: Card['cvv']
  readonly expiration: Card['expiration']
  readonly createdAt: Card['createdAt']
  readonly updatedAt: Card['updatedAt']
  readonly deleted: Card['deleted']

  constructor(card: PrismaWithoutID<Card>) {
    this.idAccount = card.idAccount
    this.number = card.number
    this.cvv = card.cvv
    this.expiration = card.expiration
    this.createdAt = card.createdAt
    this.updatedAt = card.updatedAt
    this.deleted = card.deleted
  }

  public static generate({ idAccount }: { idAccount: Card['idAccount'] }): PrismaCard {
    const createdAt = faker.date.past()
    const deleted = faker.datatype.boolean({ probability: PrismaParams.DELETED_PROBABILITY })
    const updatedAt = deleted
      ? faker.date.between({
          from: createdAt,
          to: new Date()
        })
      : createdAt

    return new PrismaCard({
      idAccount,
      number: faker.number.bigInt({
        min: 1000000000000000n,
        max: 9999999999999999n
      }),
      cvv: faker.number.int({
        min: 100,
        max: 999
      }),
      expiration: faker.date.future(),
      createdAt,
      updatedAt,
      deleted
    })
  }

  public static async insert({
    prisma,
    idAccount,
    amount
  }: {
    prisma: PrismaClient
    idAccount: Card['idAccount']
    amount: number
  }): Promise<PrismaCard[]> {
    const cards = [] as PrismaCard[]
    for (let i = 0; i < amount; i++) {
      cards.push(PrismaCard.generate({ idAccount }))
    }

    await prisma.card.createMany({
      data: cards
    })

    return cards
  }
}
