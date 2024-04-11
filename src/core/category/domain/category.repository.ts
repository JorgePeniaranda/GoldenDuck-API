import { type Category } from './category.entity'
import { type CategoryPrimitive } from './category.primitive'
import { type CreateErrorDTO } from './dto/create-category'

export interface CategoryRepository {
  create: (data: CreateErrorDTO) => Promise<Category>
  findAll: () => Promise<Category[] | null>
  findOne: (id: CategoryPrimitive['id']) => Promise<Category | null>
  delete: (id: CategoryPrimitive['id']) => Promise<void>
}
