import { type UserPrimitiveEntity } from '../../core/user/domain/user.entity'
import { PhoneNumberValidation } from './phoneNumber.validation'

export class PhoneNumber {
  constructor (
    private readonly phoneNumber: UserPrimitiveEntity['phoneNumber']
  ) {
    this.validate(this.phoneNumber)
  }

  private validate (
    phoneNumber: UserPrimitiveEntity['phoneNumber']
  ): UserPrimitiveEntity['phoneNumber'] {
    return PhoneNumberValidation.parse(phoneNumber)
  }

  public value (): UserPrimitiveEntity['phoneNumber'] {
    return this.phoneNumber
  }
}
