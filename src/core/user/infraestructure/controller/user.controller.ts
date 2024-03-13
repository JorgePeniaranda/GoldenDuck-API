import { type Request, type Response } from 'express'
import { type UserUseCase } from '../../application/userUseCase'
import { UserPhoneNumber } from '../../domain/valueObjects/phoneNumber/phoneNumber.value'
import { ID } from '../../../../valueObjects/id/id.value'

export default class UserController {
  constructor (private readonly userUseCase: UserUseCase) {}

  public getUser = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id, phoneNumber } = request.query

    const user = await this.userUseCase.findUser({
      id: new ID(Number(id)),
      phoneNumber: new UserPhoneNumber(Number(phoneNumber))
    })

    return response.json(user?.email).status(200)
  }
}
