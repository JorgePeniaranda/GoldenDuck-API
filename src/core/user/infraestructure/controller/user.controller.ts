import { type Request, type Response } from 'express'
import { type UserUseCase } from '../../application/userUseCase'
import { UserPhoneNumber } from '../../domain/valueObjects/phoneNumber/phoneNumber.value'
import { ID } from '../../../../valueObjects/id/id.value'
import { UserDNI } from '../../domain/valueObjects/dni/dni.value'
import { UserEmail } from '../../domain/valueObjects/email/email.value'

export class UserController {
  constructor (private readonly userUseCase: UserUseCase) {}

  public getUser = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id, dni, email, phoneNumber } = request.query

    const user = await this.userUseCase.findUser({
      id: typeof id === 'string' ? new ID(Number(id)) : undefined,
      dni: typeof dni === 'string' ? new UserDNI(Number(dni)) : undefined,
      email: typeof email === 'string' ? new UserEmail(email) : undefined,
      phoneNumber:
        typeof phoneNumber === 'string'
          ? new UserPhoneNumber(Number(phoneNumber))
          : undefined
    })

    if (user === null) {
      return response.status(404).send()
    }

    return response.json(user?.email).status(200)
  }
}
