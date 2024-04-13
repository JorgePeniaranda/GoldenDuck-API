import { type Category } from './category.entity'
import { type CategoryPrimitive } from './category.primitive'

export interface CategoryRepository {
  create: (data: Category) => Promise<Category>
  findAll: () => Promise<Category[]>
  findOne: ({
    id,
    name
  }: {
    id?: CategoryPrimitive['id']
    name?: CategoryPrimitive['name']
  }) => Promise<Category | null>
  delete: (data: Category) => Promise<void>
}
