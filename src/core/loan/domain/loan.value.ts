import { type LoanPrimitiveEntity, type LoanEntity } from './loan.entity'

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

  public toJSON (): LoanPrimitiveEntity {
    return {
      id: this.id.value(),
      idAccount: this.idAccount.value(),
      amount: this.amount.value(),
      interest: this.interest,
      date: this.date.value(),
      dateEnd: this.dateEnd
    }
  }
}
