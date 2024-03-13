import { type UserPrimitiveEntity } from '../../user.entity'
import { addressValidation } from './address.validation'

export class UserAddress {
  constructor (private readonly address: UserPrimitiveEntity['address']) {
    this.validate(this.address)
  }

  private validate (address: UserPrimitiveEntity['address']): UserPrimitiveEntity['address'] {
    const validatedAddress = addressValidation.parse(address)

    return validatedAddress
  }

  public value (): UserPrimitiveEntity['address'] {
    return this.address
  }
}
