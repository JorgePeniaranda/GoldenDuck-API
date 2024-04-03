import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { type CreateLoanDTO } from './dto/create-loan'
import { type Loan } from './loan.entity'
import { type LoanPrimitive } from './loan.primitive'

export interface LoanRepository {
  create: (loan: CreateLoanDTO) => Promise<Loan>
  getAll: (id: AccountPrimitive['id']) => Promise<Loan[] | null>
  find: (id: LoanPrimitive['id']) => Promise<Loan | null>
  delete: (id: LoanPrimitive['id']) => Promise<void>
}
