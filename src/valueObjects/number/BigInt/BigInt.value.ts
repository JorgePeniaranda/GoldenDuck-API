import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveValidBigInt } from './BigInt.primitive'
import { ValidBigIntSchema } from './BigInt.schema'

export class ValidBigInt extends ValueObject<PrimitiveValidBigInt['bigint']> {
  constructor (bigint: PrimitiveValidBigInt['bigint']) {
    super(bigint, ValidBigIntSchema('BigInt'))
  }
}
