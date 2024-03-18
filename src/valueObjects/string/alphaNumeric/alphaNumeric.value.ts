import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveAlphaNumeric } from './alphaNumeric.primitive'
import { AlphaNumericSchema } from './alphaNumeric.schema'

export class AlphaNumeric extends ValueObject {
  constructor (alphaNumeric: PrimitiveAlphaNumeric['alphaNumeric']) {
    super(alphaNumeric, AlphaNumericSchema('AlphaNumeric'))
  }
}
