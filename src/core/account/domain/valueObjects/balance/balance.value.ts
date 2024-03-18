import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveBalance } from './Balance.primitive'
import { ValidBigIntSchema } from '@/valueObjects/number/BigInt/BigInt.schema'

export class Balance extends ValueObject<PrimitiveBalance['balance']> {
  constructor (readonly balance: PrimitiveBalance['balance']) {
    super(balance, ValidBigIntSchema('Balance'))
  }
}
