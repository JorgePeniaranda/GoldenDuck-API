import { prisma } from '@/libs/prisma'
import { type CardRepository } from '../../domain/card.repository'
import { Card } from '../../domain/card.value'
import { type CardEntity } from '../../domain/card.entity'

export class PrismaRepository implements CardRepository {
  public async createCard (card: Card): Promise<Card> {
    await prisma.card.create({
      data: card.toJSON()
    })

    return card
  }

  public async getAllCard (
    idAccount: CardEntity['idAccount']
  ): Promise<Card[] | null> {
    const cards = await prisma.card.findMany({
      where: {
        idAccount: idAccount.value()
      }
    })

    const cardsEntity: Card[] = cards.map((card) => Card.create(card))

    return cardsEntity ?? null
  }

  public async deleteCard (id: CardEntity['id']): Promise<Card> {
    const card = await prisma.card.update({
      where: {
        id: id.value()
      },
      data: {
        deleted: true
      }
    })

    return Card.create(card)
  }

  public async findCard ({
    id
  }: {
    id?: CardEntity['id']
  }): Promise<Card | null> {
    const card = await prisma.card.findUnique({
      where: {
        id: id?.value()
      }
    })

    return card === null ? null : Card.create(card)
  }
}
