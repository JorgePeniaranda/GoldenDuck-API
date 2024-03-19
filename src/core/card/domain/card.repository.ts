import { type CardEntity } from './card.entity'
import { type Card } from './card.value'

export interface CardRepository {
  createCard: ({
    idAccount,
    number,
    cvv,
    expiration
  }: {
    idAccount: CardEntity['idAccount']
    number: CardEntity['number']
    cvv: CardEntity['cvv']
    expiration: CardEntity['expiration']
  }) => Promise<Card>
  getAllCard: (idAccount: CardEntity['idAccount']) => Promise<Card[] | null>
  findCard: ({ id }: { id?: CardEntity['id'] }) => Promise<Card | null>
  deleteCard: (id: CardEntity['id']) => Promise<void>
}
