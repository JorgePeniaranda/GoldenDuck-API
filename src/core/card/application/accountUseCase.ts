import { RequestError } from '@/helpers/customErrors'
import { ErrorsDictionary } from '@/messages/errors'
import { type CardRepository } from '../domain/card.repository'
import { type Card } from '../domain/card.value'
import { type CardEntity } from '../domain/card.entity'

export class CardUseCase {
  constructor (private readonly cardRepository: CardRepository) {}

  public async create (card: Card): Promise<Card> {
    const createdCard = await this.cardRepository.createCard(card)

    return createdCard
  }

  public async delete (card: Card): Promise<void> {
    await this.cardRepository.deleteCard(card.id)
  }

  public async getAllCard (idAccount: CardEntity['idAccount']): Promise<Card[] | null> {
    const cards = await this.cardRepository.getAllCard(idAccount)

    return cards
  }

  public async findCard (searchParams: {
    id?: CardEntity['id']
  }): Promise<Card | null> {
    if (searchParams.id === undefined) {
      throw new RequestError(ErrorsDictionary.NoParams)
    }

    const card = await this.cardRepository.findCard(searchParams)

    return card
  }
}
