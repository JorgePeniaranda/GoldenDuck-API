import { type UserPrimitiveEntity } from '../../core/user/domain/user.entity'
import { PasswordValidation } from './password.validation'

export class Password {
  constructor (private readonly password: UserPrimitiveEntity['password']) {
    this.validate(this.password)
  }

  private validate (
    password: UserPrimitiveEntity['password']
  ): UserPrimitiveEntity['password'] {
    return PasswordValidation.parse(password)
  }

  public value (): UserPrimitiveEntity['password'] {
    return this.password
  }

  public equals (password: Password): boolean {
    return this.password === password.value()
  }
}
