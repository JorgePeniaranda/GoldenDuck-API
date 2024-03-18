import { type Request, type Response } from 'express'
import { type AuthUseCase } from '../../application/authUseCase'
import { DNI } from '@/core/user/domain/valueObjects/dni/Dni.value'
import { Password } from '@/valueObjects/string/password/password.value'

export class AuthController {
  constructor (private readonly authUseCase: AuthUseCase) {}

  public login = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { dni, password } = request.body

    const token = await this.authUseCase.login({
      dni: new DNI(BigInt(dni as bigint)),
      password: new Password(String(password))
    })

    return response.status(200).header('Authorization', token.key).send()
  }

  public checkAuthentication = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const token = request.headers.authorization

    const isAuthorized = await this.authUseCase.checkAuthentication(
      String(token)
    )

    return response.status(200).send({ authorized: isAuthorized })
  }
}
