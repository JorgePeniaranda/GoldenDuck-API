import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { type Card } from './card.entity'
import { type CardPrimitive } from './card.primitive'
import { type CreateCardDTO } from './dto/create-card'

export interface CardRepository {
  create: (data: CreateCardDTO) => Promise<Card>
  findAll: (id: AccountPrimitive['id']) => Promise<Card[] | null>
  findOne: (id: CardPrimitive['id']) => Promise<Card | null>
  delete: (id: CardPrimitive['id']) => Promise<void>
}
