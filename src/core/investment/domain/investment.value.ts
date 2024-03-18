import { type InvestmentEntity } from './investment.entity'

export class Investment implements InvestmentEntity {
  readonly id: InvestmentEntity['id']
  readonly idAccount: InvestmentEntity['idAccount']
  readonly amount: InvestmentEntity['amount']
  readonly interest: InvestmentEntity['interest']
  readonly date: InvestmentEntity['date']
  readonly dateEnd: InvestmentEntity['dateEnd']

  constructor (investment: InvestmentEntity) {
    this.id = investment.id
    this.idAccount = investment.idAccount
    this.amount = investment.amount
    this.interest = investment.interest
    this.date = investment.date
    this.dateEnd = investment.dateEnd
  }
}
