import { type Loan } from '@prisma/client'
import { type LoanEntity } from './loan.entity'

export interface LoanRepository {
  createLoan: (user: Loan) => Promise<Loan>
  cancelLoan: (user: Loan) => Promise<Loan>
  findLoan: ({
    id
  }: {
    id?: LoanEntity['id']
  }) => Promise<Loan | null>
}
