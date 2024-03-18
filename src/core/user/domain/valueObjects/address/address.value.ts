import { type PrimitiveAddress } from './Address.primitive'
import { AlphaNumeric } from '@/valueObjects/string/alphaNumeric/alphaNumeric.value'

export class Address extends AlphaNumeric {
  constructor (address: PrimitiveAddress['address']) {
    super(address, 'Address')
  }
}
