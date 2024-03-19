import { RequestError } from '@/helpers/customErrors'
import { ErrorsDictionary } from '@/messages/errors'
import { type CardRepository } from '../domain/card.repository'
import { type Card } from '../domain/card.value'
import { type CardEntity } from '../domain/card.entity'

export class CardUseCase {
  constructor (private readonly cardRepository: CardRepository) {}

  public async create ({
    idAccount,
    number,
    cvv,
    expiration
  }: {
    idAccount: CardEntity['idAccount']
    number: CardEntity['number']
    cvv: CardEntity['cvv']
    expiration: CardEntity['expiration']
  }): Promise<Card> {
    const createdCard = await this.cardRepository.createCard({
      idAccount,
      number,
      cvv,
      expiration
    })

    return createdCard
  }

  public async delete (id: CardEntity['id']): Promise<void> {
    await this.cardRepository.deleteCard(id)
  }

  public async getAllCard (
    idAccount: CardEntity['idAccount']
  ): Promise<Card[] | null> {
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
