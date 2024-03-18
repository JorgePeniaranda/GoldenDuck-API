import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitivePositiveFloat } from './PositiveFloat.primitive'
import { PositiveFloatSchema } from './PositiveFloat.schema'

export class PositiveFloat extends ValueObject {
  constructor (float: PrimitivePositiveFloat['float']) {
    super(float, PositiveFloatSchema('PositiveFloat'))
  }
}
