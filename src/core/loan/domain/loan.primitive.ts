import { type Loan } from '@prisma/client'

export interface LoanPrimitive {
  readonly id: Loan['id']
  readonly idAccount: Loan['idAccount']
  readonly amount: Loan['amount']
  readonly interest: Loan['interest']
  readonly dateEnd: Loan['dateEnd']
  updatedAt: Loan['updatedAt']
  readonly createdAt: Loan['createdAt']
  canceled: Loan['canceled']
}
