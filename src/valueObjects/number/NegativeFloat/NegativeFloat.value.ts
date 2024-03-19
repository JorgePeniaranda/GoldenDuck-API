import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveNegativeFloat } from './NegativeFloat.primitive'
import { NegativeFloatSchema } from './NegativeFloat.schema'

export class NegativeFloat extends ValueObject<
PrimitiveNegativeFloat['float']
> {
  constructor (float: PrimitiveNegativeFloat['float'], name?: string) {
    super(float, NegativeFloatSchema(name ?? 'NegativeFloat'))
  }
}
