import { type Request, type Response } from 'express'
import { type CardUseCase } from '../../application/cardUseCase'
import { ID } from '@/valueObjects/number/ID/ID.value'
import { CardNumber } from '../../domain/valueObjects/cardNumber/CardNumber.value'
import { CVV } from '../../domain/valueObjects/cvv/cvv.value'
import { PastDate } from '@/valueObjects/date/PastDate/PastDate.value'

export class CardController {
  constructor (private readonly cardUseCase: CardUseCase) {}

  public createCard = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id, number, cvv, expiration } = request.query

    const card = await this.cardUseCase.create({
      idAccount: new ID(Number(id)),
      number: new CardNumber(BigInt(String(number))),
      cvv: new CVV(Number(cvv)),
      expiration: new PastDate(String(expiration))
    })

    if (card === null) {
      return response.status(404).send()
    }

    return response.json(card?.id).status(200)
  }

  public getAllCard = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.query

    const cards = await this.cardUseCase.getAllCard(new ID(Number(id)))

    if (cards === null) {
      return response.status(404).send()
    }

    const cardsToJson = cards.map((card) => {
      return { ...card.toJSON(), number: card.number.toString() }
    })

    return response.json(cardsToJson).status(200)
  }

  public delete = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.query

    await this.cardUseCase.delete(new ID(Number(id)))

    return response.json().status(204)
  }

  public getCard = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.query

    const card = await this.cardUseCase.findCard({
      id: typeof id === 'string' ? new ID(Number(id)) : undefined
    })

    if (card === null) {
      return response.status(404).send()
    }

    return response.json(card?.id).status(200)
  }
}
