import { type UserPrimitiveEntity } from '../../user.entity'
import { LastNameValidation } from './lastName.validation'

export class UserLastName {
  constructor (private readonly lastName: UserPrimitiveEntity['lastName']) {
    this.validate(this.lastName)
  }

  private validate (lastName: UserPrimitiveEntity['lastName']): UserPrimitiveEntity['lastName'] {
    const validatedLastName = LastNameValidation.parse(lastName)

    return validatedLastName
  }

  public value (): UserPrimitiveEntity['lastName'] {
    return this.lastName
  }
}
