import { type LoanEntity } from './loan.entity'
import { type Loan } from './loan.value'

export interface LoanRepository {
  createLoan: ({
    idAccount,
    amount,
    interest,
    dateEnd
  }: {
    idAccount: LoanEntity['idAccount']
    amount: LoanEntity['amount']
    interest: LoanEntity['interest']
    dateEnd: LoanEntity['dateEnd']
  }) => Promise<Loan>
  getAllLoan: (
    idAccount?: LoanEntity['idAccount'],
  ) => Promise<Loan[] | null>
  findLoan: ({ id }: { id?: LoanEntity['id'] }) => Promise<Loan | null>
  cancelLoan: (id: LoanEntity['id']) => Promise<void>
}
