import { type PrimitiveValidBigInt } from '@/valueObjects/number/BigInt/BigInt.primitive'

export interface PrimitiveBalance {
  balance: PrimitiveValidBigInt['bigint']
}
