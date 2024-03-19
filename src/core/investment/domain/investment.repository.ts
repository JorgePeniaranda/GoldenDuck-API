import { type InvestmentEntity } from './investment.entity'
import { type Investment } from './investment.value'

export interface InvestmentRepository {
  createInvestment: ({
    idAccount,
    amount,
    interest,
    dateEnd
  }: {
    idAccount: InvestmentEntity['idAccount']
    amount: InvestmentEntity['amount']
    interest: InvestmentEntity['interest']
    dateEnd: InvestmentEntity['dateEnd']
  }) => Promise<Investment>
  getAllInvestment: (
    idAccount?: InvestmentEntity['idAccount'],
  ) => Promise<Investment[] | null>
  findInvestment: ({
    id
  }: {
    id?: InvestmentEntity['id']
  }) => Promise<Investment | null>
  cancelInvestment: ({ id }: { id: InvestmentEntity['id'] }) => Promise<void>
}
