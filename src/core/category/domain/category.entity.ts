import { Field, ID, ObjectType } from '@nestjs/graphql'
import { type CategoryPrimitive } from './category.primitive'

@ObjectType()
export class Category implements CategoryPrimitive {
  readonly #id: CategoryPrimitive['id']
  @Field(() => String)
    name: CategoryPrimitive['name']

  @Field(() => Date)
    updatedAt: CategoryPrimitive['updatedAt']

  readonly #createdAt: CategoryPrimitive['createdAt']
  @Field(() => Boolean)
    deleted: CategoryPrimitive['deleted']

  constructor (transaction: CategoryPrimitive) {
    this.#id = transaction.id
    this.name = transaction.name
    this.updatedAt = transaction.updatedAt
    this.#createdAt = transaction.createdAt
    this.deleted = transaction.deleted
  }

  @Field(() => ID)
  get id (): CategoryPrimitive['id'] {
    return this.#id
  }

  @Field(() => Date)
  get createdAt (): CategoryPrimitive['createdAt'] {
    return this.#createdAt
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
