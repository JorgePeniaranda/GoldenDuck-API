import { ID } from '@/valueObjects/number/ID/ID.value'
import { type LoanPrimitiveEntity, type LoanEntity } from './loan.entity'
import { Balance } from '@/core/account/domain/valueObjects/balance/Balance.value'
import { PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { ValidDate } from '@/valueObjects/date/ValidDate/ValidDate.value'

export class Loan implements LoanEntity {
  readonly id: LoanEntity['id']
  readonly idAccount: LoanEntity['idAccount']
  readonly amount: LoanEntity['amount']
  readonly interest: LoanEntity['interest']
  readonly date: LoanEntity['date']
  readonly dateEnd: LoanEntity['dateEnd']

  constructor (loan: LoanEntity) {
    this.id = loan.id
    this.idAccount = loan.idAccount
    this.amount = loan.amount
    this.interest = loan.interest
    this.date = loan.date
    this.dateEnd = loan.dateEnd
  }

  public create (loan: LoanPrimitiveEntity): Loan {
    return new Loan({
      id: new ID(loan.id),
      idAccount: new ID(loan.idAccount),
      amount: new Balance(loan.amount),
      interest: loan.interest,
      date: new PastDate(loan.date),
      dateEnd: new ValidDate(loan.dateEnd)
    })
  }

  public toJSON (): LoanPrimitiveEntity {
    return {
      id: this.id.value,
      idAccount: this.idAccount.value,
      amount: this.amount.value,
      interest: this.interest,
      date: this.date.value,
      dateEnd: this.dateEnd.value
    }
  }
}
