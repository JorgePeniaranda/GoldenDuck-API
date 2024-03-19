import { type Request, type Response } from 'express'
import { type UserUseCase } from '../../application/userUseCase'
import { ID } from '@/valueObjects/number/ID/ID.value'
import { DNI } from '../../domain/valueObjects/dni/Dni.value'
import { Email } from '@/valueObjects/string/email/email.value'
import { PhoneNumber } from '../../domain/valueObjects/phoneNumber/phoneNumber.value'

export class UserController {
  constructor (private readonly userUseCase: UserUseCase) {}

  public getUser = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id, dni, email, phoneNumber } = request.query

    const user = await this.userUseCase.findUser({
      id: typeof id === 'string' ? new ID(Number(id)) : undefined,
      dni: typeof dni === 'string' ? new DNI(BigInt(dni)) : undefined,
      email: typeof email === 'string' ? new Email(email) : undefined,
      phoneNumber:
        typeof phoneNumber === 'string'
          ? new PhoneNumber(BigInt(phoneNumber))
          : undefined
    })

    if (user === null) {
      return response.status(404).send()
    }

    return response
      .json({
        ...user?.toJSON(),
        dni: user.dni.toString(),
        phoneNumber: user.phoneNumber.toString()
      })
      .status(200)
  }
}
