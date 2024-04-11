import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { Inject, Injectable } from '@nestjs/common'
import { type Card } from '../card.entity'
import { type CardPrimitive } from '../card.primitive'
import { CardRepository } from '../card.repository'
import { type CreateCardDTO } from '../dto/create-card'

@Injectable()
export class CardService {
  constructor (@Inject('CardRepository') private readonly cardRepository: CardRepository) {}

  public async create (data: CreateCardDTO): Promise<Card> {
    return await this.cardRepository.create(data)
  }

  public async findAll (id: AccountPrimitive['id']): Promise<Card[] | null> {
    return await this.cardRepository.findAll(id)
  }

  public async findOne (id: CardPrimitive['id']): Promise<Card | null> {
    return await this.cardRepository.findOne(id)
  }

  public async delete (id: CardPrimitive['id']): Promise<void> {
    await this.cardRepository.delete(id)
  }
}
