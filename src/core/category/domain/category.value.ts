import { type CategoryPrimitiveEntity, type CategoryEntity } from './category.entity'

export class Category implements CategoryEntity {
  public readonly id: CategoryEntity['id']
  public name: CategoryEntity['name']
  public deleted: CategoryEntity['deleted']

  constructor (Category: CategoryEntity) {
    this.id = Category.id
    this.name = Category.name
    this.deleted = Category.deleted
  }

  public toJSON (): CategoryPrimitiveEntity {
    return {
      id: this.id.value(),
      name: this.name,
      deleted: this.deleted
    }
  }
}
