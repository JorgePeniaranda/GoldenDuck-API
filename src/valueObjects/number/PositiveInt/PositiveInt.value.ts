import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { PositiveIntSchema } from './PositiveInt.schema'
import { type PrimitivePositiveInt } from './PositiveInt.primitive'

export class PositiveInt extends ValueObject {
  constructor (int: PrimitivePositiveInt['int']) {
    super(int, PositiveIntSchema('PositiveInt'))
  }
}
