import { type LoanPrimitive } from './loan.primitive'

export class Loan implements LoanPrimitive {
  readonly #id: LoanPrimitive['id']
  readonly #idAccount: LoanPrimitive['idAccount']
  readonly #amount: LoanPrimitive['amount']
  readonly #interest: LoanPrimitive['interest']
  readonly #dateEnd: LoanPrimitive['dateEnd']
  updatedAt: LoanPrimitive['updatedAt']
  readonly #createdAt: LoanPrimitive['createdAt']
  canceled: LoanPrimitive['canceled']

  constructor (loan: LoanPrimitive) {
    this.#id = loan.id
    this.#idAccount = loan.idAccount
    this.#amount = loan.amount
    this.#interest = loan.interest
    this.#dateEnd = loan.dateEnd
    this.updatedAt = loan.updatedAt
    this.#createdAt = loan.createdAt
    this.canceled = loan.canceled
  }

  get id (): LoanPrimitive['id'] {
    return this.#id
  }

  get idAccount (): LoanPrimitive['idAccount'] {
    return this.#idAccount
  }

  get amount (): LoanPrimitive['amount'] {
    return this.#amount
  }

  get interest (): LoanPrimitive['interest'] {
    return this.#interest
  }

  get dateEnd (): LoanPrimitive['dateEnd'] {
    return this.#dateEnd
  }

  get createdAt (): LoanPrimitive['createdAt'] {
    return this.#createdAt
  }

  public static create ({
    idAccount,
    amount,
    interest,
    dateEnd
  }: {
    idAccount: LoanPrimitive['idAccount']
    amount: LoanPrimitive['amount']
    interest: LoanPrimitive['interest']
    dateEnd: LoanPrimitive['dateEnd']
  }): Loan {
    return new Loan({
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

  public toJSON (): LoanPrimitive {
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
