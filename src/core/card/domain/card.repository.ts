import { type CardEntity } from './card.entity'
import { type Card } from './card.value'

export interface CardRepository {
  createCard: (card: Card) => Promise<Card>
  getAllCard: () => Promise<Card[]>
  deleteCard: (id: CardEntity['id']) => Promise<Card>
  findCard: ({
    id
  }: {
    id?: CardEntity['id']
  }) => Promise<Card | null>
}
