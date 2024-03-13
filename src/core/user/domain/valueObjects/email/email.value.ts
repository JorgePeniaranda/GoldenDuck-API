import { type UserPrimitiveEntity } from '../../user.entity'
import { EmailValidation } from './email.validation'

export class UserEmail {
  constructor (private readonly email: UserPrimitiveEntity['email']) {
    this.validate(this.email)
  }

  private validate (email: UserPrimitiveEntity['email']): UserPrimitiveEntity['email'] {
    const validatedEmail = EmailValidation.parse(email)

    return validatedEmail
  }

  public value (): UserPrimitiveEntity['email'] {
    return this.email
  }
}
