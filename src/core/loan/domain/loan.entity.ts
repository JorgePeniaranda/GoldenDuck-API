import { Field, ID } from '@nestjs/graphql'
import { type LoanPrimitive } from './loan.primitive'

export class Loan implements LoanPrimitive {
  readonly #id: LoanPrimitive['id']
  readonly #idAccount: LoanPrimitive['idAccount']
  readonly #amount: LoanPrimitive['amount']
  readonly #interest: LoanPrimitive['interest']
  readonly #dateEnd: LoanPrimitive['dateEnd']
  #updatedAt: LoanPrimitive['updatedAt']
  readonly #createdAt: LoanPrimitive['createdAt']
  #canceled: LoanPrimitive['canceled']

  constructor (loan: LoanPrimitive) {
    this.#id = loan.id
    this.#idAccount = loan.idAccount
    this.#amount = loan.amount
    this.#interest = loan.interest
    this.#dateEnd = loan.dateEnd
    this.#updatedAt = loan.updatedAt
    this.#createdAt = loan.createdAt
    this.#canceled = loan.canceled
  }

  /* -------------------- GETTER / SETTER -------------------- */ // MARK: GETTER / SETTER
  @Field(() => ID)
  public get id (): LoanPrimitive['id'] {
    return this.#id
  }

  @Field(() => Number)
  public get idAccount (): LoanPrimitive['idAccount'] {
    return this.#idAccount
  }

  @Field(() => Number)
  public get amount (): LoanPrimitive['amount'] {
    return this.#amount
  }

  @Field(() => Number)
  public get interest (): LoanPrimitive['interest'] {
    return this.#interest
  }

  @Field(() => Date)
  public get dateEnd (): LoanPrimitive['dateEnd'] {
    return this.#dateEnd
  }

  @Field(() => Date)
  public get updatedAt (): LoanPrimitive['updatedAt'] {
    return this.#updatedAt
  }

  @Field(() => Date)
  public get createdAt (): LoanPrimitive['createdAt'] {
    return this.#createdAt
  }

  @Field(() => Boolean)
  public get canceled (): LoanPrimitive['canceled'] {
    return this.#canceled
  }

  /* -------------------- METHODS -------------------- */ // MARK: METHODS
  #updateUpdatedAt (): void {
    this.#updatedAt = new Date()
  }

  public cancel (): void {
    this.#canceled = true
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
