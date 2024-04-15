import { Field, ID } from '@nestjs/graphql'
import { type ErrorPrimitive } from './error.primitive'

export class Error implements ErrorPrimitive {
  readonly #id: ErrorPrimitive['id']
  readonly #name: ErrorPrimitive['name']
  readonly #message: ErrorPrimitive['message']
  readonly #stack: ErrorPrimitive['stack']
  #updatedAt: ErrorPrimitive['updatedAt']
  readonly #createdAt: ErrorPrimitive['createdAt']
  #deleted: ErrorPrimitive['deleted']

  constructor (transaction: ErrorPrimitive) {
    this.#id = transaction.id
    this.#name = transaction.name
    this.#message = transaction.message
    this.#stack = transaction.stack
    this.#updatedAt = transaction.updatedAt
    this.#createdAt = transaction.createdAt
    this.#deleted = transaction.deleted
  }

  /* -------------------- GETTER / SETTER -------------------- */ // MARK: GETTER / SETTER
  @Field(() => ID)
  public get id (): ErrorPrimitive['id'] {
    return this.#id
  }

  @Field(() => String)
  public get name (): ErrorPrimitive['name'] {
    return this.#name
  }

  @Field(() => String)
  public get message (): ErrorPrimitive['message'] {
    return this.#message
  }

  @Field(() => String)
  public get stack (): ErrorPrimitive['stack'] {
    return this.#stack
  }

  @Field(() => Date)
  public get updatedAt (): ErrorPrimitive['updatedAt'] {
    return this.#updatedAt
  }

  public set updatedAt (value: ErrorPrimitive['updatedAt']) {
    this.#updatedAt = value
  }

  @Field(() => Date)
  public get createdAt (): ErrorPrimitive['createdAt'] {
    return this.#createdAt
  }

  @Field(() => Boolean)
  public get deleted (): ErrorPrimitive['deleted'] {
    return this.#deleted
  }

  /* -------------------- METHODS -------------------- */ // MARK: METHODS
  public delete (): void {
    this.#deleted = true
  }

  public static create ({
    name,
    message,
    stack
  }: {
    name: ErrorPrimitive['name']
    message: ErrorPrimitive['message']
    stack: ErrorPrimitive['stack']
  }): Error {
    return new Error({
      id: 0,
      name,
      message,
      stack,
      updatedAt: new Date(),
      createdAt: new Date(),
      deleted: false
    })
  }

  public toJSON (): ErrorPrimitive {
    return {
      id: this.id,
      name: this.name,
      message: this.message,
      stack: this.stack,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
      deleted: this.deleted
    }
  }
}
