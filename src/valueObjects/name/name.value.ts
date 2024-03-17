import { type UserPrimitiveEntity } from '../../core/user/domain/user.entity'
import { NameValidation } from './name.validation'

export class Name {
  constructor (private readonly name: UserPrimitiveEntity['name']) {
    this.validate(this.name)
  }

  private validate (
    name: UserPrimitiveEntity['name']
  ): UserPrimitiveEntity['name'] {
    return NameValidation.parse(name)
  }

  public value (): UserPrimitiveEntity['name'] {
    return this.name
  }
}
