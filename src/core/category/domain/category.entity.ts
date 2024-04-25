import { Transaction } from '@/core/transaction/domain/transaction.entity'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { type CategoryPrimitive } from './category.primitive'
import { Expose } from 'class-transformer'

@ObjectType()
export class Category implements CategoryPrimitive {
  readonly #id: CategoryPrimitive['id']
  #name: CategoryPrimitive['name']
  #updatedAt: CategoryPrimitive['updatedAt']
  readonly #createdAt: CategoryPrimitive['createdAt']
  #deleted: CategoryPrimitive['deleted']

  constructor (category: CategoryPrimitive) {
    this.#id = category.id
    this.#name = category.name
    this.#updatedAt = category.updatedAt
    this.#createdAt = category.createdAt
    this.#deleted = category.deleted
  }

  /* -------------------- RELATIONS -------------------- */ // MARK: RELATIONS
  @Field(() => Transaction, { nullable: true })
  readonly transactions: Transaction[]

  /* -------------------- GETTER / SETTER -------------------- */ // MARK: GETTER / SETTER
  @Field(() => ID)
  @Expose()
  public get id (): CategoryPrimitive['id'] {
    return this.#id
  }

  @Field(() => String)
  @Expose()
  public get name (): CategoryPrimitive['name'] {
    return this.#name
  }

  public set name (value: CategoryPrimitive['name']) {
    this.#name = value
    this.#updateUpdatedAt()
  }

  @Field(() => Date)
  @Expose()
  public get updatedAt (): CategoryPrimitive['updatedAt'] {
    return this.#updatedAt
  }

  @Field(() => Date)
  @Expose()
  public get createdAt (): CategoryPrimitive['createdAt'] {
    return this.#createdAt
  }

  @Field(() => Boolean)
  @Expose()
  public get deleted (): CategoryPrimitive['deleted'] {
    return this.#deleted
  }

  /* -------------------- METHODS -------------------- */ // MARK: METHODS
  #updateUpdatedAt (): void {
    this.#updatedAt = new Date()
  }

  public delete (): void {
    this.#deleted = true
    this.#updateUpdatedAt()
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
