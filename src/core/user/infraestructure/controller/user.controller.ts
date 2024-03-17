import { type Request, type Response } from 'express'
import { type UserUseCase } from '../../application/userUseCase'
import { ID } from '../../../../valueObjects/id/id.value'
import { PhoneNumber } from '@/valueObjects/phoneNumber/phoneNumber.value'
import { Email } from '@/valueObjects/email/email.value'
import { DNI } from '@/valueObjects/dni/dni.value'

export class UserController {
  constructor (private readonly userUseCase: UserUseCase) {}

  public getUser = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id, dni, email, phoneNumber } = request.query

    const user = await this.userUseCase.findUser({
      id: typeof id === 'string' ? new ID(Number(id)) : undefined,
      dni: typeof dni === 'string' ? new DNI(Number(dni)) : undefined,
      email: typeof email === 'string' ? new Email(email) : undefined,
      phoneNumber:
        typeof phoneNumber === 'string'
          ? new PhoneNumber(Number(phoneNumber))
          : undefined
    })

    if (user === null) {
      return response.status(404).send()
    }

    return response.json(user?.email).status(200)
  }
}
