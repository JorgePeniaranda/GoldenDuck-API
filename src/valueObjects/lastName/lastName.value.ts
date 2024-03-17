import { type UserPrimitiveEntity } from '../../core/user/domain/user.entity'
import { LastNameValidation } from './lastName.validation'

export class LastName {
  constructor (private readonly lastName: UserPrimitiveEntity['lastName']) {
    this.validate(this.lastName)
  }

  private validate (
    lastName: UserPrimitiveEntity['lastName']
  ): UserPrimitiveEntity['lastName'] {
    return LastNameValidation.parse(lastName)
  }

  public value (): UserPrimitiveEntity['lastName'] {
    return this.lastName
  }
}
