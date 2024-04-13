import { type CategoryPrimitive } from './category.primitive'

export class Category implements CategoryPrimitive {
  readonly #id: CategoryPrimitive['id']
  name: CategoryPrimitive['name']
  updatedAt: CategoryPrimitive['updatedAt']
  readonly #createdAt: CategoryPrimitive['createdAt']
  deleted: CategoryPrimitive['deleted']

  constructor (transaction: CategoryPrimitive) {
    this.#id = transaction.id
    this.name = transaction.name
    this.updatedAt = transaction.updatedAt
    this.#createdAt = transaction.createdAt
    this.deleted = transaction.deleted
  }

  get id (): CategoryPrimitive['id'] {
    return this.#id
  }

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
