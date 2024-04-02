import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { type CreateInvestmentDTO } from './dto/create-loan'
import { type Investment } from './investment.entity'
import { type InvestmentPrimitive } from './investment.primitive'

export interface InvestmentRepository {
  create: (loan: CreateInvestmentDTO) => Promise<Investment>
  getAll: (id: AccountPrimitive['id']) => Promise<Investment[] | null>
  find: (id: InvestmentPrimitive['id']) => Promise<Investment | null>
  delete: (id: InvestmentPrimitive['id']) => Promise<void>
}
