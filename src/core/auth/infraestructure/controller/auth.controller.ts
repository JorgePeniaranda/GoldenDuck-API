import { type Request, type Response } from 'express'
import { type AuthUseCase } from '../../application/authUseCase'
import { UserDNI } from '@/core/user/domain/valueObjects/dni/dni.value'
import { UserPassword } from '@/core/user/domain/valueObjects/password/password.value'

export class AuthController {
  constructor (private readonly authUseCase: AuthUseCase) {}

  public login = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { dni, password } = request.body

    const token = await this.authUseCase.login({
      dni: new UserDNI(Number(dni)),
      password: new UserPassword(String(password))
    })

    return response.status(200).header('Authorization', token.key).send()
  }
}