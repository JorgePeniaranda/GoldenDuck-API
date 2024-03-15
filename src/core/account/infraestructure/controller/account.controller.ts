import { type Request, type Response } from 'express'
import { ID } from '../../../../valueObjects/id/id.value'
import { type AccountUseCase } from '../../application/accountUseCase'

export class AccountController {
  constructor (private readonly accountUseCase: AccountUseCase) {}

  public getUser = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.query

    const user = await this.accountUseCase.findUser({
      id: typeof id === 'string' ? new ID(Number(id)) : undefined
    })

    if (user === null) {
      return response.status(404).send()
    }

    return response.json(user?.id).status(200)
  }
}