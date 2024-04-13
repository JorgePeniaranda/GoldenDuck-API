import { type Investment } from '@prisma/client'

export interface InvestmentPrimitive {
  readonly id: Investment['id']
  readonly idAccount: Investment['idAccount']
  readonly amount: Investment['amount']
  readonly interest: Investment['interest']
  readonly dateEnd: Investment['dateEnd']
  updatedAt: Investment['updatedAt']
  readonly createdAt: Investment['createdAt']
  canceled: Investment['canceled']
}
