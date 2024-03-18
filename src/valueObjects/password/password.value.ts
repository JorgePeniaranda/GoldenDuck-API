import { type PrimitivePassword } from './password.primitive'
import { PasswordValidation } from './password.validation'

export class Password implements PrimitivePassword {
  constructor (readonly password: PrimitivePassword['password']) {
    this.validate(this.password)
  }

  private validate (
    password: PrimitivePassword['password']
  ): PrimitivePassword['password'] {
    return PasswordValidation.parse(password)
  }

  public value (): PrimitivePassword['password'] {
    return this.password
  }

  public equals (password: Password): boolean {
    return this.password === password.value()
  }
}
