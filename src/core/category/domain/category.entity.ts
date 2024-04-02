import { type CategoryPrimitive } from './category.primitive'

export class Category implements CategoryPrimitive {
  id: CategoryPrimitive['id']
  name: CategoryPrimitive['name']
  updatedAt: CategoryPrimitive['updatedAt']
  createdAt: CategoryPrimitive['createdAt']
  deleted: CategoryPrimitive['deleted']

  constructor (transaction: CategoryPrimitive) {
    this.id = transaction.id
    this.name = transaction.name
    this.updatedAt = transaction.updatedAt
    this.createdAt = transaction.createdAt
    this.deleted = transaction.deleted
  }
}
