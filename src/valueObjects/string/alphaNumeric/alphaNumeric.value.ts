import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveAlphaNumeric } from './alphaNumeric.primitive'
import { AlphaNumericSchema } from './alphaNumeric.schema'

export class AlphaNumeric extends ValueObject<PrimitiveAlphaNumeric['alphaNumeric']> {
  constructor (alphaNumeric: PrimitiveAlphaNumeric['alphaNumeric']) {
    super(alphaNumeric, AlphaNumericSchema('AlphaNumeric'))
  }
}
