import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveNegativeBigInt } from './NegativeBigInt.primitive'
import { NegativeBigIntSchema } from './NegativeBigInt.schema'

export class NegativeBigInt extends ValueObject<PrimitiveNegativeBigInt['bigint']> {
  constructor (bigint: PrimitiveNegativeBigInt['bigint'], name?: string) {
    super(bigint, NegativeBigIntSchema(name ?? 'NegativeBigInt'))
  }
}
