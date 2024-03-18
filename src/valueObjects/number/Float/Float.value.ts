import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveFloat } from './Float.primitive'
import { FloatSchema } from './Float.schema'

export class Float extends ValueObject<PrimitiveFloat['float']> {
  constructor (float: PrimitiveFloat['float'], name?: string) {
    super(float, FloatSchema(name ?? 'Float'))
  }
}
