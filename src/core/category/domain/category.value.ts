import { ID } from '@/valueObjects/id/id.value'
import {
  type CategoryPrimitiveEntity,
  type CategoryEntity
} from './category.entity'
import { Alphabetic } from '@/valueObjects/alphabetic/alphabetic.value'

export class Category implements CategoryEntity {
  public readonly id: CategoryEntity['id']
  public name: CategoryEntity['name']
  public deleted: CategoryEntity['deleted']

  constructor (Category: CategoryEntity) {
    this.id = Category.id
    this.name = Category.name
    this.deleted = Category.deleted
  }

  public create (category: CategoryPrimitiveEntity): Category {
    return new Category({
      id: new ID(category.id),
      name: new Alphabetic(category.name),
      deleted: category.deleted
    })
  }

  public toJSON (): CategoryPrimitiveEntity {
    return {
      id: this.id.value(),
      name: this.name.value(),
      deleted: this.deleted
    }
  }
}
