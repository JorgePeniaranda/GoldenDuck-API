import { type Investment } from '@prisma/client'

export interface InvestmentPrimitive {
  id: Investment['id']
  idAccount: Investment['idAccount']
  amount: Investment['amount']
  interest: Investment['interest']
  dateEnd: Investment['dateEnd']
  updatedAt: Investment['updatedAt']
  createdAt: Investment['createdAt']
  canceled: Investment['canceled']
}
