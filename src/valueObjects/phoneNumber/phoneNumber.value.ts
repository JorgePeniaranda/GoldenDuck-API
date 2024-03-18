import { type PrimitivePhoneNumber } from './phoneNumber.primitive'
import { PhoneNumberValidation } from './phoneNumber.validation'

export class PhoneNumber implements PrimitivePhoneNumber {
  constructor (
    readonly phoneNumber: PrimitivePhoneNumber['phoneNumber']
  ) {
    this.validate(this.phoneNumber)
  }

  private validate (
    phoneNumber: PrimitivePhoneNumber['phoneNumber']
  ): PrimitivePhoneNumber['phoneNumber'] {
    return PhoneNumberValidation.parse(phoneNumber)
  }

  public value (): PrimitivePhoneNumber['phoneNumber'] {
    return this.phoneNumber
  }
}
