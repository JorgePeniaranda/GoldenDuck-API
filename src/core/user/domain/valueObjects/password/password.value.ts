import { type UserPrimitiveEntity } from '../../user.entity'
import { PasswordValidation } from './password.validation'

export class UserPassword {
  constructor (private readonly password: UserPrimitiveEntity['password']) {
    this.validate(this.password)
  }

  private validate (copy: UserPrimitiveEntity['password']): UserPrimitiveEntity['password'] {
    const validatedPassword = PasswordValidation.parse(copy)

    return validatedPassword
  }

  public value (): UserPrimitiveEntity['password'] {
    return this.password
  }
}
