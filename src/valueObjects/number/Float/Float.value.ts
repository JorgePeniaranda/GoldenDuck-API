import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveFloat } from './Float.primitive'
import { FloatSchema } from './Float.schema'

export class Float extends ValueObject {
  constructor (float: PrimitiveFloat['float']) {
    super(float, FloatSchema('Float'))
  }
}
