import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { PositiveIntSchema } from './PositiveInt.schema'
import { type PrimitivePositiveInt } from './PositiveInt.primitive'

export class PositiveInt extends ValueObject<PrimitivePositiveInt['int']> {
  constructor (int: PrimitivePositiveInt['int'], name?: string) {
    super(int, PositiveIntSchema(name ?? 'PositiveInt'))
  }
}
