import { type Request, type Response } from 'express'
import { type CardUseCase } from '../../application/accountUseCase'
import { ID } from '@/valueObjects/id/id.value'

export class CardController {
  constructor (private readonly cardUseCase: CardUseCase) {}

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
