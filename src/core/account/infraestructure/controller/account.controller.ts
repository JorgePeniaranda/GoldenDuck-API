import { type Request, type Response } from 'express'
import { type AccountUseCase } from '../../application/accountUseCase'
import { ID } from '@/valueObjects/number/ID/ID.value'

export class AccountController {
  constructor (private readonly accountUseCase: AccountUseCase) {}

  public getUser = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.query

    const user = await this.accountUseCase.findUser({
      id: typeof id === 'string' ? new ID(Number(1)) : undefined
    })

    if (user === null) {
      return response.status(404).send()
    }

    return response
      .json({ ...user.toJSON(), balance: user?.balance.toString() })
      .status(200)
  }
}
