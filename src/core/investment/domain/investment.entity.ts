import { type InvestmentPrimitive } from './investment.primitive'

export class Investment implements InvestmentPrimitive {
  readonly #id: InvestmentPrimitive['id']
  readonly #idAccount: InvestmentPrimitive['idAccount']
  readonly #amount: InvestmentPrimitive['amount']
  readonly #interest: InvestmentPrimitive['interest']
  readonly #dateEnd: InvestmentPrimitive['dateEnd']
  updatedAt: InvestmentPrimitive['updatedAt']
  readonly #createdAt: InvestmentPrimitive['createdAt']
  canceled: InvestmentPrimitive['canceled']

  constructor (loan: InvestmentPrimitive) {
    this.#id = loan.id
    this.#idAccount = loan.idAccount
    this.#amount = loan.amount
    this.#interest = loan.interest
    this.#dateEnd = loan.dateEnd
    this.updatedAt = loan.updatedAt
    this.#createdAt = loan.createdAt
    this.canceled = loan.canceled
  }

  get id (): InvestmentPrimitive['id'] {
    return this.#id
  }

  get idAccount (): InvestmentPrimitive['idAccount'] {
    return this.#idAccount
  }

  get amount (): InvestmentPrimitive['amount'] {
    return this.#amount
  }

  get interest (): InvestmentPrimitive['interest'] {
    return this.#interest
  }

  get dateEnd (): InvestmentPrimitive['dateEnd'] {
    return this.#dateEnd
  }

  get createdAt (): InvestmentPrimitive['createdAt'] {
    return this.#createdAt
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
