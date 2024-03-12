import { type Request, type Response } from 'express'
import { type UserUseCase } from '../../application/userUseCase'

export default class UserController {
  constructor (private readonly userUseCase: UserUseCase) {}

  public getUser = async (request: Request, response: Response): Promise<Response> => {
    const { id, email, phoneNumber } = request.query

    const user = await this.userUseCase.findUser({
      id: Number(id),
      email: String(email),
      phoneNumber: Number(phoneNumber)
    })

    return response.json(user?.email).status(200)
  }
}
