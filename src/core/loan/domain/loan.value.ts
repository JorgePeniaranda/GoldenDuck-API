import { type LoanEntity } from './loan.entity'

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

  public toJSON (): LoanEntity {
    return {
      id: this.id,
      idAccount: this.idAccount,
      amount: this.amount,
      interest: this.interest,
      date: this.date,
      dateEnd: this.dateEnd
    }
  }
}
