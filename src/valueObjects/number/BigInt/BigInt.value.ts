import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveValidBigInt } from './BigInt.primitive'
import { ValidBigIntSchema } from './BigInt.schema'

export class ValidBigInt extends ValueObject {
  constructor (bigint: PrimitiveValidBigInt['bigint']) {
    super(bigint, ValidBigIntSchema('BigInt'))
  }
}
