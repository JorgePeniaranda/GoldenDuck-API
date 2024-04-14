import { Field, ID } from '@nestjs/graphql'
import { type ErrorPrimitive } from './error.primitive'

export class Error implements ErrorPrimitive {
  readonly #id: ErrorPrimitive['id']
  @Field(() => String)
    name: ErrorPrimitive['name']

  @Field(() => String)
    message: ErrorPrimitive['message']

  @Field(() => String)
    stack: ErrorPrimitive['stack']

  @Field(() => Date)
    updatedAt: ErrorPrimitive['updatedAt']

  readonly #createdAt: ErrorPrimitive['createdAt']
  @Field(() => Boolean)
    deleted: ErrorPrimitive['deleted']

  constructor (transaction: ErrorPrimitive) {
    this.#id = transaction.id
    this.name = transaction.name
    this.message = transaction.message
    this.stack = transaction.stack
    this.updatedAt = transaction.updatedAt
    this.#createdAt = transaction.createdAt
    this.deleted = transaction.deleted
  }

  @Field(() => ID)
  get id (): ErrorPrimitive['id'] {
    return this.#id
  }

  @Field(() => Date)
  get createdAt (): ErrorPrimitive['createdAt'] {
    return this.#createdAt
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
