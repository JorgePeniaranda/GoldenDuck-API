import { type Request, type Response } from 'express'
import { type AccountUseCase } from '../../application/accountUseCase'
import { ID } from '@/valueObjects/number/ID/ID.value'

export class AccountController {
  constructor (private readonly accountUseCase: AccountUseCase) {}

  public createAccount = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { idUser } = request.query

    const user = await this.accountUseCase.create({
      idUser: new ID(Number(idUser))
    })

    if (user === null) {
      return response.status(404).send()
    }

    return response
      .json({ ...user.toJSON(), balance: user?.balance.toString() })
      .status(200)
  }

  public getAllAccount = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { idUser } = request.query

    const users = await this.accountUseCase.getAllAccount(
      new ID(Number(idUser))
    )

    if (users === null) {
      return response.status(404).send()
    }

    const usersToJson = users.map((account) => {
      return { ...account.toJSON(), balance: account.balance.toString() }
    })

    return response.json(usersToJson).status(200)
  }

  public getAccount = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.query

    const user = await this.accountUseCase.findAccount({
      id: typeof id === 'string' ? new ID(Number(id)) : undefined
    })

    if (user === null) {
      return response.status(404).send()
    }

    return response
      .json({ ...user.toJSON(), balance: user?.balance.toString() })
      .status(200)
  }

  public updateAccount = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.query

    const user = await this.accountUseCase.findAccount({
      id: typeof id === 'string' ? new ID(Number(id)) : undefined
    })

    if (user === null) {
      return response.status(404).send()
    }

    return response
      .json({ ...user.toJSON(), balance: user?.balance.toString() })
      .status(200)
  }

  public deleteAccount = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.query

    await this.accountUseCase.delete(new ID(Number(id)))

    return response.json().status(204)
  }
}
