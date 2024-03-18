import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { NegativeIntSchema } from './NegativeInt.schema'
import { type PrimitiveNegativeInt } from './NegativeInt.primitive'

export class NegativeInt extends ValueObject<PrimitiveNegativeInt['int']> {
  constructor (int: PrimitiveNegativeInt['int'], name?: string) {
    super(int, NegativeIntSchema(name ?? 'NegativeInt'))
  }
}
