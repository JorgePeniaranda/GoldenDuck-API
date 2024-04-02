import { type Category } from './category.entity'
import { type CategoryPrimitive } from './category.primitive'
import { type CreateErrorDTO } from './dto/create-category'

export interface CategoryRepository {
  create: (transaction: CreateErrorDTO) => Promise<Category>
  getAll: () => Promise<Category[] | null>
  find: (id: CategoryPrimitive['id']) => Promise<Category | null>
  delete: (id: CategoryPrimitive['id']) => Promise<void>
}
