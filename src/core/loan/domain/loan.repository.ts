import { type Loan } from './loan.entity'
import { type LoanPrimitive } from './loan.primitive'

export interface LoanRepository {
  create: (data: Loan) => Promise<Loan>
  findAll: ({ idAccount }: { idAccount: LoanPrimitive['idAccount'] }) => Promise<Loan[]>
  findOne: ({
    idAccount,
    index
  }: {
    idAccount: LoanPrimitive['idAccount']
    index: number
  }) => Promise<Loan | null>
  findByID: ({ id }: { id: LoanPrimitive['idAccount'] }) => Promise<Loan | null>
  delete: (data: Loan) => Promise<void>
}
