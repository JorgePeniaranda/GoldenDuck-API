import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitivePassword } from './password.primitive'
import { PasswordSchema } from './password.schema'

export class Password extends ValueObject {
  constructor (password: PrimitivePassword['password']) {
    super(password, PasswordSchema('Password'))
  }
}
