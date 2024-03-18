import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveNegativeFloat } from './NegativeFloat.primitive'
import { NegativeFloatSchema } from './NegativeFloat.schema'

export class NegativeFloat extends ValueObject {
  constructor (float: PrimitiveNegativeFloat['float']) {
    super(float, NegativeFloatSchema('NegativeFloat'))
  }
}
