import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { NegativeIntSchema } from './NegativeInt.schema'
import { type PrimitiveNegativeInt } from './NegativeInt.primitive'

export class NegativeInt extends ValueObject {
  constructor (int: PrimitiveNegativeInt['int']) {
    super(int, NegativeIntSchema('NegativeInt'))
  }
}
