import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { Card } from '../domain/card.entity'
import { type CardPrimitive } from '../domain/card.primitive'
import { type CardRepository } from '../domain/card.repository'
import { type CreateCardDTO } from '../domain/dto/create-card'

@Injectable()
export class CardRepositoryPrismaMySQL implements CardRepository {
  constructor (private readonly prisma: PrismaService) {}

  public async create (data: CreateCardDTO): Promise<Card> {
    const newCard = await this.prisma.card.create({
      data
    })

    return new Card(newCard)
  }

  public async getAll (
    idAccount: AccountPrimitive['id']
  ): Promise<Card[] | null> {
    const cards = await this.prisma.card.findMany({
      where: {
        idAccount
      }
    })

    return cards.map((card) => new Card(card))
  }

  public async find (id: CardPrimitive['id']): Promise<Card | null> {
    const card = await this.prisma.card.findUnique({
      where: {
        id
      }
    })

    return card !== null ? new Card(card) : null
  }

  public async delete (id: CardPrimitive['id']): Promise<void> {
    await this.prisma.card.delete({
      where: {
        id
      }
    })
  }
}
