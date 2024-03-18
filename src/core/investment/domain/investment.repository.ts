import { type InvestmentEntity } from './investment.entity'
import { type Investment } from './investment.value'

export interface InvestmentRepository {
  createInvestment: (user: Investment) => Promise<Investment>
  cancelInvestment: (user: Investment) => Promise<Investment>
  findInvestment: ({
    id
  }: {
    id?: InvestmentEntity['id']
  }) => Promise<Investment | null>
}
