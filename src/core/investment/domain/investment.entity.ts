import { type InvestmentPrimitive } from './investment.primitive'

export class Investment implements InvestmentPrimitive {
  id: InvestmentPrimitive['id']
  idAccount: InvestmentPrimitive['idAccount']
  amount: InvestmentPrimitive['amount']
  interest: InvestmentPrimitive['interest']
  dateEnd: InvestmentPrimitive['dateEnd']
  updatedAt: InvestmentPrimitive['updatedAt']
  createdAt: InvestmentPrimitive['createdAt']
  canceled: InvestmentPrimitive['canceled']

  constructor (loan: InvestmentPrimitive) {
    this.id = loan.id
    this.idAccount = loan.idAccount
    this.amount = loan.amount
    this.interest = loan.interest
    this.dateEnd = loan.dateEnd
    this.updatedAt = loan.updatedAt
    this.createdAt = loan.createdAt
    this.canceled = loan.canceled
  }
}
