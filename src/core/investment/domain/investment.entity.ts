import { Account } from '@/core/account/domain/account.entity'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { type InvestmentPrimitive } from './investment.primitive'
import { Expose } from 'class-transformer'

@ObjectType()
export class Investment implements InvestmentPrimitive {
  readonly #id: InvestmentPrimitive['id']
  readonly #idAccount: InvestmentPrimitive['idAccount']
  readonly #amount: InvestmentPrimitive['amount']
  readonly #interest: InvestmentPrimitive['interest']
  readonly #dateEnd: InvestmentPrimitive['dateEnd']
  #updatedAt: InvestmentPrimitive['updatedAt']
  readonly #createdAt: InvestmentPrimitive['createdAt']
  #canceled: InvestmentPrimitive['canceled']

  constructor (loan: InvestmentPrimitive) {
    this.#id = loan.id
    this.#idAccount = loan.idAccount
    this.#amount = loan.amount
    this.#interest = loan.interest
    this.#dateEnd = loan.dateEnd
    this.#updatedAt = loan.updatedAt
    this.#createdAt = loan.createdAt
    this.#canceled = loan.canceled
  }

  /* -------------------- RELATIONS -------------------- */ // MARK: RELATIONS
  @Field(() => Account)
  readonly account: Account

  /* -------------------- GETTER / SETTER -------------------- */ // MARK: GETTER / SETTER
  @Field(() => ID)
  @Expose()
  public get id (): InvestmentPrimitive['id'] {
    return this.#id
  }

  @Field(() => Number)
  @Expose()
  public get idAccount (): InvestmentPrimitive['idAccount'] {
    return this.#idAccount
  }

  @Field(() => Number)
  @Expose()
  public get amount (): InvestmentPrimitive['amount'] {
    return this.#amount
  }

  @Field(() => Number)
  @Expose()
  public get interest (): InvestmentPrimitive['interest'] {
    return this.#interest
  }

  @Field(() => Date)
  @Expose()
  public get dateEnd (): InvestmentPrimitive['dateEnd'] {
    return this.#dateEnd
  }

  @Field(() => Date)
  @Expose()
  public get updatedAt (): InvestmentPrimitive['updatedAt'] {
    return this.#updatedAt
  }

  @Field(() => Date)
  @Expose()
  public get createdAt (): InvestmentPrimitive['createdAt'] {
    return this.#createdAt
  }

  @Field(() => Boolean)
  @Expose()
  public get canceled (): InvestmentPrimitive['canceled'] {
    return this.#canceled
  }

  /* -------------------- METHODS -------------------- */ // MARK: METHODS
  #updateUpdatedAt (): void {
    this.#updatedAt = new Date()
  }

  public cancel (): void {
    this.#canceled = true
    this.#updateUpdatedAt()
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
