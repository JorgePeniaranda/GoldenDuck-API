import { type AccountPrimitiveEntity } from '../../account.entity'
import { balanceValidation } from './balance.validation'

export class AccountBalance {
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
