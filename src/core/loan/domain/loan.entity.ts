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
}
