import { env } from '@/constants/env'
import { Transaction } from '@/core/transaction/domain/transaction.entity'
import { Field, HideField, ID, ObjectType } from '@nestjs/graphql'
import { Exclude, Expose } from 'class-transformer'
import CryptoJS from 'crypto-js'
import moment from 'moment'
import { type CodePrimitive } from './code.primitive'

@ObjectType()
export class Code implements CodePrimitive {
  readonly #id: CodePrimitive['id']
  readonly #idUser: CodePrimitive['idUser']
  readonly #code: CodePrimitive['code']
  readonly #type: CodePrimitive['type']
  readonly #expiredAt: CodePrimitive['expiredAt']
  #updatedAt: CodePrimitive['updatedAt']
  readonly #createdAt: CodePrimitive['createdAt']
  #expired: CodePrimitive['expired']

  constructor (code: CodePrimitive) {
    this.#id = code.id
    this.#idUser = code.idUser
    this.#code = code.code
    this.#type = code.type
    this.#expiredAt = code.expiredAt
    this.#updatedAt = code.updatedAt
    this.#createdAt = code.createdAt
    this.#expired = code.expired
  }

  /* -------------------- RELATIONS -------------------- */ // MARK: RELATIONS
  @Field(() => Transaction, { nullable: true })
  readonly transactions: Transaction[]

  /* -------------------- GETTER / SETTER -------------------- */ // MARK: GETTER / SETTER
  @Field(() => ID)
  @Expose()
  public get id (): CodePrimitive['id'] {
    return this.#id
  }

  @Field(() => Number)
  @Expose()
  public get idUser (): CodePrimitive['idUser'] {
    return this.#idUser
  }

  @HideField()
  @Exclude()
  public get code (): CodePrimitive['code'] {
    return this.#code
  }

  @Field(() => String)
  @Expose()
  public get type (): CodePrimitive['type'] {
    return this.#type
  }

  @Field(() => String)
  @Expose()
  public get expiredAt (): CodePrimitive['expiredAt'] {
    return this.#expiredAt
  }

  @Field(() => Date)
  @Expose()
  public get updatedAt (): CodePrimitive['updatedAt'] {
    return this.#updatedAt
  }

  @Field(() => Date)
  @Expose()
  public get createdAt (): CodePrimitive['createdAt'] {
    return this.#createdAt
  }

  @Field(() => Boolean)
  @Expose()
  public get expired (): CodePrimitive['expired'] {
    return this.#expired
  }

  /* -------------------- METHODS -------------------- */ // MARK: METHODS
  #updateUpdatedAt (): void {
    this.#updatedAt = new Date()
  }

  public expire (): void {
    this.#expired = true
    this.#updateUpdatedAt()
  }

  public static create ({
    idUser,
    code,
    type
  }: {
    idUser: CodePrimitive['idUser']
    code: CodePrimitive['code']
    type: CodePrimitive['type']
  }): Code {
    code = CryptoJS.SHA256(code).toString(CryptoJS.enc.Hex)
    const expiredAt = moment().add(env.CODE_EXPIRATION_MINUTES, 'minutes').toDate()

    return new Code({
      id: '',
      idUser,
      code,
      type,
      expiredAt,
      updatedAt: new Date(),
      createdAt: new Date(),
      expired: false
    })
  }

  public compare (input: string): boolean {
    return this.code === CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex)
  }

  public toJSON (): CodePrimitive {
    return {
      id: this.id,
      idUser: this.idUser,
      code: this.code,
      type: this.type,
      expiredAt: this.expiredAt,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
      expired: this.expired
    }
  }
}
