import { Field, ID } from '@nestjs/graphql'
import { type InvestmentPrimitive } from './investment.primitive'

export class Investment implements InvestmentPrimitive {
  readonly #id: InvestmentPrimitive['id']
  readonly #idAccount: InvestmentPrimitive['idAccount']
  readonly #amount: InvestmentPrimitive['amount']
  readonly #interest: InvestmentPrimitive['interest']
  readonly #dateEnd: InvestmentPrimitive['dateEnd']
  @Field(() => Date)
    updatedAt: InvestmentPrimitive['updatedAt']

  readonly #createdAt: InvestmentPrimitive['createdAt']
  @Field(() => Boolean)
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

  @Field(() => ID)
  get id (): InvestmentPrimitive['id'] {
    return this.#id
  }

  @Field(() => Number)
  get idAccount (): InvestmentPrimitive['idAccount'] {
    return this.#idAccount
  }

  @Field(() => Number)
  get amount (): InvestmentPrimitive['amount'] {
    return this.#amount
  }

  @Field(() => Number)
  get interest (): InvestmentPrimitive['interest'] {
    return this.#interest
  }

  @Field(() => Date)
  get dateEnd (): InvestmentPrimitive['dateEnd'] {
    return this.#dateEnd
  }

  @Field(() => Date)
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
