import { type Category } from '@prisma/client'

export interface CategoryPrimitive {
  id: Category['id']
  name: Category['name']
  updatedAt: Category['updatedAt']
  createdAt: Category['createdAt']
  deleted: Category['deleted']
}
