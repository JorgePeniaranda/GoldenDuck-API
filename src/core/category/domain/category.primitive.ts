import { type Category } from '@prisma/client'

export interface CategoryPrimitive {
  readonly id: Category['id']
  name: Category['name']
  updatedAt: Category['updatedAt']
  readonly createdAt: Category['createdAt']
  deleted: Category['deleted']
}
