import { type Request, type Response } from 'express'
import type UseruUseCase from '../../application/userUseCase'

export default class UserController {
  constructor (private readonly userUseCase: UseruUseCase) {

  }

  public getUser = async (request: Request, response: Response): Promise<Response> => {
    const { id, email, phoneNumber } = request.query
    let user

    if (id !== '' && user !== null) {
      user = await this.userUseCase.findUser({
        id: Number(id),
        email: String(email),
        phoneNumber: Number(phoneNumber)
      })
    }

    return response.json(user?.email).status(200)
  }
}
