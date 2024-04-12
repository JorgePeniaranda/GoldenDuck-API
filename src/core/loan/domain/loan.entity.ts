import { type LoanPrimitive } from './loan.primitive'

export class Loan implements LoanPrimitive {
  id: LoanPrimitive['id']
  idAccount: LoanPrimitive['idAccount']
  amount: LoanPrimitive['amount']
  interest: LoanPrimitive['interest']
  dateEnd: LoanPrimitive['dateEnd']
  updatedAt: LoanPrimitive['updatedAt']
  createdAt: LoanPrimitive['createdAt']
  canceled: LoanPrimitive['canceled']

  constructor (loan: LoanPrimitive) {
    this.id = loan.id
    this.idAccount = loan.idAccount
    this.amount = loan.amount
    this.interest = loan.interest
    this.dateEnd = loan.dateEnd
    this.updatedAt = loan.updatedAt
    this.createdAt = loan.createdAt
    this.canceled = loan.canceled
  }

  public static create ({
    idAccount,
    amount,
    interest,
    dateEnd
  }: {
    idAccount: LoanPrimitive['idAccount']
    amount: LoanPrimitive['amount']
    interest: LoanPrimitive['interest']
    dateEnd: LoanPrimitive['dateEnd']
  }): Loan {
    return new Loan({
      id: 0,
      idAccount,
      amount,
      interest,
      dateEnd,
      updatedAt: new Date(),
      createdAt: new Date(),
      canceled: false
    })
  }

  public toJSON (): LoanPrimitive {
    return {
      id: this.id,
      idAccount: this.idAccount,
      amount: this.amount,
      interest: this.interest,
      dateEnd: this.dateEnd,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
      canceled: this.canceled
    }
  }
}
