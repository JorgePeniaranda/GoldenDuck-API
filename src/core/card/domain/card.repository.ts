import { type CardEntity } from './card.entity'
import { type Card } from './card.value'

export interface CardRepository {
  createCard: (card: Card) => Promise<Card>
  getAllCard: (idAccount: CardEntity['idAccount']) => Promise<Card[] | null>
  deleteCard: (id: CardEntity['id']) => Promise<Card>
  findCard: ({ id }: { id?: CardEntity['id'] }) => Promise<Card | null>
}
