import { addressValidation } from './address.validation'
import { type PrimitiveAddress } from './address.primitive'

export class Address implements PrimitiveAddress {
  constructor (readonly address: PrimitiveAddress['address']) {
    this.validate(this.address)
  }

  private validate (
    address: PrimitiveAddress['address']
  ): PrimitiveAddress['address'] {
    return addressValidation.parse(address)
  }

  public value (): PrimitiveAddress['address'] {
    return this.address
  }
}
