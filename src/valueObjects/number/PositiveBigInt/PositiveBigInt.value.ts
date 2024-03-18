import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitivePositiveBigInt } from './PositiveBigInt.primitive'
import { PositiveBigIntSchema } from './PositiveBigInt.schema'

export class PositiveBigInt extends ValueObject {
  constructor (bigint: PrimitivePositiveBigInt['bigint']) {
    super(bigint, PositiveBigIntSchema('PositiveBigInt'))
  }
}
