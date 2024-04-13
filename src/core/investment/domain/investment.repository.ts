import { type Investment } from './investment.entity'
import { type InvestmentPrimitive } from './investment.primitive'

export interface InvestmentRepository {
  create: (data: Investment) => Promise<Investment>
  findAll: ({ idAccount }: { idAccount: InvestmentPrimitive['idAccount'] }) => Promise<Investment[]>
  findOne: ({
    idAccount,
    index
  }: {
    idAccount: InvestmentPrimitive['idAccount']
    index: number
  }) => Promise<Investment | null>
  findByID: ({ id }: { id: InvestmentPrimitive['id'] }) => Promise<Investment | null>
  delete: (data: Investment) => Promise<void>
}
