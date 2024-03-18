import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveCVV } from './cvv.primitive'
import { PositiveFloatSchema } from '@/valueObjects/number/PositiveFloat/PositiveFloat.schema'

export class CVV extends ValueObject {
  constructor (readonly cvv: PrimitiveCVV['cvv']) {
    super(cvv, PositiveFloatSchema('CVV'))
  }
}
