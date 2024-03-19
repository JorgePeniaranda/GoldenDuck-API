import { type Request, type Response } from 'express'
import { type UserUseCase } from '../../application/userUseCase'
import { ID } from '@/valueObjects/number/ID/ID.value'
import { DNI } from '../../domain/valueObjects/dni/Dni.value'
import { Email } from '@/valueObjects/string/email/email.value'
import { PhoneNumber } from '../../domain/valueObjects/phoneNumber/phoneNumber.value'

export class UserController {
  constructor (private readonly userUseCase: UserUseCase) {}

  public createUser = async (request: Request, response: Response): Promise<Response> => {
    const { name, lastName, dni, email, phoneNumber, password, address, birthDate, sex } = request.body

    const createdUser = await this.userUseCase.createUser({
      name,
      lastName,
      dni: new DNI(BigInt(String(dni))),
      email: new Email(String(email)),
      phoneNumber: new PhoneNumber(BigInt(String(phoneNumber))),
      password,
      address,
      birthDate,
      sex
    })

    if (createdUser === null) {
      return response.status(400).send()
    }

    return response.json(createdUser).status(201)
  }

  public updateUser = async (request: Request, response: Response): Promise<Response> => {
    const { id, email, phoneNumber, password } = request.body

    const updatedUser = await this.userUseCase.updateUser({
      id: new ID(Number(id)),
      email: new Email(String(email)),
      phoneNumber: new PhoneNumber(BigInt(String(phoneNumber))),
      password
    })

    if (updatedUser === null) {
      return response.status(404).send()
    }

    return response.json(updatedUser).status(200)
  }

  public deleteUser = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params

    await this.userUseCase.deleteUser(new ID(Number(id)))

    return response.status(204).send()
  }

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

  public checkUser = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { dni, email, phoneNumber } = request.query

    const user = await this.userUseCase.checkUser({
      dni: typeof dni === 'string' ? new DNI(BigInt(dni)) : undefined,
      email: typeof email === 'string' ? new Email(email) : undefined,
      phoneNumber:
        typeof phoneNumber === 'string'
          ? new PhoneNumber(BigInt(phoneNumber))
          : undefined
    })

    return response.json(user).status(200)
  }
}
