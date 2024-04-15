import { Field, ID, ObjectType } from '@nestjs/graphql'
import { type CategoryPrimitive } from './category.primitive'

@ObjectType()
export class Category implements CategoryPrimitive {
  readonly #id: CategoryPrimitive['id']
  #name: CategoryPrimitive['name']
  #updatedAt: CategoryPrimitive['updatedAt']
  readonly #createdAt: CategoryPrimitive['createdAt']
  #deleted: CategoryPrimitive['deleted']

  constructor (transaction: CategoryPrimitive) {
    this.#id = transaction.id
    this.#name = transaction.name
    this.#updatedAt = transaction.updatedAt
    this.#createdAt = transaction.createdAt
    this.#deleted = transaction.deleted
  }

  // #region ASDASD
  @Field(() => ID)
  public get id (): CategoryPrimitive['id'] {
    return this.#id
  }

  @Field(() => String)
  public get name (): CategoryPrimitive['name'] {
    return this.#name
  }

  public set name (value: CategoryPrimitive['name']) {
    this.#name = value
  }

  @Field(() => Date)
  public get updatedAt (): CategoryPrimitive['updatedAt'] {
    return this.#updatedAt
  }

  public set updatedAt (value: CategoryPrimitive['updatedAt']) {
    this.#updatedAt = value
  }

  @Field(() => Date)
  public get createdAt (): CategoryPrimitive['createdAt'] {
    return this.#createdAt
  }

  @Field(() => Boolean)
  public get deleted (): CategoryPrimitive['deleted'] {
    return this.#deleted
  }

  /* -------------------- METHODS -------------------- */ // MARK: METHODS
  public delete (): void {
    this.#deleted = true
  }

  public static create ({ name }: { name: CategoryPrimitive['name'] }): Category {
    return new Category({
      id: 0,
      name,
      updatedAt: new Date(),
      createdAt: new Date(),
      deleted: false
    })
  }

  public toJSON (): CategoryPrimitive {
    return {
      id: this.id,
      name: this.name,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
      deleted: this.deleted
    }
  }
}
