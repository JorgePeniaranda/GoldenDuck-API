import { type PrimitiveBalance } from './Balance.primitive'
import { ValidBigInt } from '@/valueObjects/number/BigInt/BigInt.value'

export class Balance extends ValidBigInt {
  constructor (balance: PrimitiveBalance['balance']) {
    super(balance, 'Balance')
  }
}
