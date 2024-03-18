import { type CategoryEntity } from './category.entity'

export class Category implements CategoryEntity {
  public readonly id: CategoryEntity['id']
  public name: CategoryEntity['name']
  public deleted: CategoryEntity['deleted']

  constructor (Category: CategoryEntity) {
    this.id = Category.id
    this.name = Category.name
    this.deleted = Category.deleted
  }

  public toJSON (): CategoryEntity {
    return {
      id: this.id,
      name: this.name,
      deleted: this.deleted
    }
  }
}
