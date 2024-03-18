import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitivePassword } from './password.primitive'
import { PasswordSchema } from './password.schema'

export class Password extends ValueObject<PrimitivePassword['password']> {
  constructor (password: PrimitivePassword['password']) {
    super(password, PasswordSchema('Password'))
  }

  public equals (password: Password): boolean {
    return this.value === password.value
  }
}
