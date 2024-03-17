import { type AccountPrimitiveEntity } from '../../core/account/domain/account.entity'
import { balanceValidation } from './balance.validation'

export class Balance {
  constructor (private readonly balance: AccountPrimitiveEntity['balance']) {
    this.validate(this.balance)
  }

  private validate (
    balance: AccountPrimitiveEntity['balance']
  ): AccountPrimitiveEntity['balance'] {
    const validatedBalance = balanceValidation.parse(balance)

    return validatedBalance
  }

  public value (): AccountPrimitiveEntity['balance'] {
    return this.balance
  }
}
