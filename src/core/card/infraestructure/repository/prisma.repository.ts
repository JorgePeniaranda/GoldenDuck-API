import { prisma } from '@/libs/prisma'
import { type CardRepository } from '../../domain/card.repository'
import { Card } from '../../domain/card.value'
import { type CardEntity } from '../../domain/card.entity'

export class PrismaRepository implements CardRepository {
  public async createCard ({
    idAccount,
    number,
    cvv,
    expiration
  }: {
    idAccount: CardEntity['idAccount']
    number: CardEntity['number']
    cvv: CardEntity['cvv']
    expiration: CardEntity['expiration']
  }): Promise<Card> {
    const createdCard = await prisma.card.create({
      data: {
        idAccount: idAccount.value,
        number: number.value,
        cvv: cvv.value,
        expiration: expiration.value
      }
    })

    return new Card(createdCard)
  }

  public async findCard ({
    id
  }: {
    id?: CardEntity['id']
  }): Promise<Card | null> {
    const card = await prisma.card.findFirst({
      where: {
        id: id?.value
      }
    })

    return card === null ? null : new Card(card)
  }

  public async getAllCard (
    idAccount: CardEntity['idAccount']
  ): Promise<Card[] | null> {
    const findCards = await prisma.card.findMany({
      where: {
        idAccount: idAccount.value
      }
    })

    const cardsEntity: Card[] = findCards.map((card) => new Card(card))

    return cardsEntity ?? null
  }

  public async deleteCard (id: CardEntity['id']): Promise<void> {
    await prisma.card.update({
      where: {
        id: id.value
      },
      data: {
        updatedAt: new Date(),
        deleted: true
      }
    })
  }
}
