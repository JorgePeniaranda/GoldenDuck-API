import { NotFoundError, ValidationError } from '@/helpers/customErrors'
import { Token } from '../domain/token.value'
import { type UserEntity } from '@/core/user/domain/user.entity'
import { ErrorsDictionary } from '@/messages/errors'
import { type UserRepository } from '@/core/user/domain/user.repository'
import { type TokenEntity, TokenExpiration, TokenType } from '../domain/token.entity'

export class AuthUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  public async login ({
    dni,
    password
  }: {
    dni: UserEntity['dni']
    password: UserEntity['password']
  }): Promise<Token> {
    const user = await this.userRepository.findUser({ dni })

    if (user === null) {
      throw new NotFoundError(ErrorsDictionary.UserNotFound)
    }

    if (!user.password.equals(password)) {
      throw new ValidationError(ErrorsDictionary.IncorrectPassword)
    }

    const token = Token.create(
      user.id,
      TokenType.API,
      user.role,
      TokenExpiration.LONG
    )

    return token
  }

  public async checkAuthentication (token: TokenEntity['key']): Promise<boolean> {
    return Token.verify(token)
  }
}
