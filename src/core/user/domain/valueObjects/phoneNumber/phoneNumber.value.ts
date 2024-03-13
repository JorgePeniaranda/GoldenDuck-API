import { type UserPrimitiveEntity } from '../../user.entity'
import { PhoneNumberValidation } from './phoneNumber.validation'

export class UserPhoneNumber {
  constructor (private readonly phoneNumber: UserPrimitiveEntity['phoneNumber']) {
    this.validate(this.phoneNumber)
  }

  private validate (phoneNumber: UserPrimitiveEntity['phoneNumber']): UserPrimitiveEntity['phoneNumber'] {
    const validatedPhoneNumber = PhoneNumberValidation.parse(phoneNumber)

    return validatedPhoneNumber
  }

  public value (): UserPrimitiveEntity['phoneNumber'] {
    return this.phoneNumber
  }
}
