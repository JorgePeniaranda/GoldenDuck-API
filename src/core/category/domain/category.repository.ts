import { type CategoryEntity } from './category.entity'
import { type Category } from './category.value'

export interface CategoryRepository {
  createCategory: (user: Category) => Promise<Category>
  updateCategory: (user: Category) => Promise<Category>
  deleteCategory: (user: Category) => Promise<void>
  findCategory: ({
    id
  }: {
    id?: CategoryEntity['id']
  }) => Promise<Category | null>
}
