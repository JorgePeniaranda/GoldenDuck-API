import { type PrimitiveBalance } from './balance.primitive'
import { balanceValidation } from './balance.validation'

export class Balance implements PrimitiveBalance {
  constructor (readonly balance: PrimitiveBalance['balance']) {
    this.validate(this.balance)
  }

  private validate (
    balance: PrimitiveBalance['balance']
  ): PrimitiveBalance['balance'] {
    return balanceValidation.parse(balance)
  }

  public value (): PrimitiveBalance['balance'] {
    return this.balance
  }
}
