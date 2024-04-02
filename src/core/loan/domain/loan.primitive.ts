import { type Loan } from '@prisma/client'

export interface LoanPrimitive {
  id: Loan['id']
  idAccount: Loan['idAccount']
  amount: Loan['amount']
  interest: Loan['interest']
  dateEnd: Loan['dateEnd']
  updatedAt: Loan['updatedAt']
  createdAt: Loan['createdAt']
  canceled: Loan['canceled']
}
