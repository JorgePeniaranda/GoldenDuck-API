import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { type Card } from './card.entity'

export interface CardRepository {
  create: (data: Card) => Promise<Card>
  findAll: ({ idAccount }: { idAccount: AccountPrimitive['id'] }) => Promise<Card[] | null>
  findOne: ({
    idAccount,
    index
  }: {
    idAccount: AccountPrimitive['id']
    index: number
  }) => Promise<Card | null>
  delete: (data: Card) => Promise<void>
}
