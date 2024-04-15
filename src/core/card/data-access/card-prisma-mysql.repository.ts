import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { Card } from '../domain/card.entity'
import { type CardPrimitive } from '../domain/card.primitive'
import { type CardRepository } from '../domain/card.repository'

@Injectable()
export class CardRepositoryPrismaMySQL implements CardRepository {
  constructor (private readonly prisma: PrismaService) {}

  /* ---------- create ---------- */ // MARK: create

  public async create (data: Card): Promise<Card> {
    const card = await this.prisma.card.create({
      data: {
        ...data.toJSON(),
        id: undefined
      }
    })

    return new Card(card)
  }

  /* ---------- findAll ---------- */ // MARK: findAll
  public async findAll ({
    idAccount
  }: {
    idAccount: AccountPrimitive['id']
  }): Promise<Card[] | null> {
    const cards = await this.prisma.card.findMany({
      where: {
        idAccount,
        deleted: false
      }
    })

    return cards.map(card => new Card(card))
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  public async findOne ({
    idAccount,
    index
  }: {
    idAccount: AccountPrimitive['id']
    index: number
  }): Promise<Card | null> {
    const card = await this.prisma.card.findMany({
      where: {
        idAccount,
        deleted: false
      },
      skip: index,
      take: 1
    })

    return card[0] !== undefined ? new Card(card[0]) : null
  }

  /* ---------- findByID ---------- */ // MARK: findByID
  public async findByID ({ id }: { id: CardPrimitive['id'] }): Promise<Card | null> {
    const card = await this.prisma.card.findUnique({
      where: {
        id,
        deleted: false
      }
    })

    return card !== null ? new Card(card) : null
  }

  public async delete (data: Card): Promise<void> {
    await this.prisma.card.update({
      where: {
        ...data.toJSON(),
        deleted: false
      },
      data: {
        deleted: true
      }
    })
  }
}
