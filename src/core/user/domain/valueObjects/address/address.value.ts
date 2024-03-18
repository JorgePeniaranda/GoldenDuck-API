import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveAddress } from './Address.primitive'
import { AlphaNumericSchema } from '@/valueObjects/string/alphaNumeric/alphaNumeric.schema'

export class Address extends ValueObject<PrimitiveAddress['address']> {
  constructor (address: PrimitiveAddress['address']) {
    super(address, AlphaNumericSchema('Address'))
  }
}
