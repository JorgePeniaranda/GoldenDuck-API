import { type PrimitiveEmail } from './email.primitive'
import { EmailValidation } from './email.validation'

export class Email implements PrimitiveEmail {
  constructor (readonly email: PrimitiveEmail['email']) {
    this.validate(this.email)
  }

  private validate (
    email: PrimitiveEmail['email']
  ): PrimitiveEmail['email'] {
    return EmailValidation.parse(email)
  }

  public value (): PrimitiveEmail['email'] {
    return this.email
  }
}
