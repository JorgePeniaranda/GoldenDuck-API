import { ID } from '@/valueObjects/number/ID/ID.value'
import {
  type CategoryPrimitiveEntity,
  type CategoryEntity
} from './category.entity'
import { Alphabetic } from '@/valueObjects/string/alphabetic/alphabetic.value'
import { ValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.value'

const ObjectName = 'Category'

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
      id: new ID(category.id, `${ObjectName} -> ID`),
      name: new Alphabetic(category.name, `${ObjectName} -> Name`),
      deleted: new ValidBoolean(category.deleted, `${ObjectName} -> Deleted`)
    })
  }

  public toJSON (): CategoryPrimitiveEntity {
    return {
      id: this.id.value,
      name: this.name.value,
      deleted: this.deleted.value
    }
  }
}
