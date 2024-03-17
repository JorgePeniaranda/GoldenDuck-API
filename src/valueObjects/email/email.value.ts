import { type UserPrimitiveEntity } from '../../core/user/domain/user.entity'
import { EmailValidation } from './email.validation'

export class Email {
  constructor (private readonly email: UserPrimitiveEntity['email']) {
    this.validate(this.email)
  }

  private validate (
    email: UserPrimitiveEntity['email']
  ): UserPrimitiveEntity['email'] {
    return EmailValidation.parse(email)
  }

  public value (): UserPrimitiveEntity['email'] {
    return this.email
  }
}
