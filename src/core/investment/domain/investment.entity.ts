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

  public static create ({
    idAccount,
    amount,
    interest,
    dateEnd
  }: {
    idAccount: InvestmentPrimitive['idAccount']
    amount: InvestmentPrimitive['amount']
    interest: InvestmentPrimitive['interest']
    dateEnd: InvestmentPrimitive['dateEnd']
  }): Investment {
    return new Investment({
      id: 0,
      idAccount,
      amount,
      interest,
      dateEnd,
      updatedAt: new Date(),
      createdAt: new Date(),
      canceled: false
    })
  }

  public toJSON (): InvestmentPrimitive {
    return {
      id: this.id,
      idAccount: this.idAccount,
      amount: this.amount,
      interest: this.interest,
      dateEnd: this.dateEnd,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
      canceled: this.canceled
    }
  }
}
