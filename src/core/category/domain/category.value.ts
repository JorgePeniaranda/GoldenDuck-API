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

  constructor (category: CategoryPrimitiveEntity) {
    this.id = new ID(category.id, `${ObjectName} -> ID`)
    this.name = new Alphabetic(category.name, `${ObjectName} -> Name`)
    this.deleted = new ValidBoolean(category.deleted, `${ObjectName} -> Deleted`)
  }

  public toJSON (): CategoryPrimitiveEntity {
    return {
      id: this.id.value,
      name: this.name.value,
      deleted: this.deleted.value
    }
  }
}
