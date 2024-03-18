import { type PrimitiveBalance } from './Balance.primitive'
import { Float } from '@/valueObjects/number/Float/Float.value'

export class Balance extends Float {
  constructor (balance: PrimitiveBalance['balance']) {
    super(balance, 'Balance')
  }
}
