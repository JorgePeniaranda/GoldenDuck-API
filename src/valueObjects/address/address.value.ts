import { type UserPrimitiveEntity } from '../../core/user/domain/user.entity'
import { addressValidation } from './address.validation'

export class Address {
  constructor (private readonly address: UserPrimitiveEntity['address']) {
    this.validate(this.address)
  }

  private validate (
    address: UserPrimitiveEntity['address']
  ): UserPrimitiveEntity['address'] {
    return addressValidation.parse(address)
  }

  public value (): UserPrimitiveEntity['address'] {
    return this.address
  }
}
