import { type CategoryEntity } from './category.entity'
import { type Category } from './category.value'

export interface CategoryRepository {
  createCategory: ({ name }: { name: CategoryEntity['name'] }) => Promise<Category>
  getAllCategory: () => Promise<Category[] | null>
  findCategory: ({
    id
  }: {
    id?: CategoryEntity['id']
  }) => Promise<Category | null>
  updateCategory: ({ id, name }: { id: CategoryEntity['id'], name: CategoryEntity['name'] }) => Promise<Category>
  deleteCategory: ({ id }: { id: CategoryEntity['id'] }) => Promise<void>
}
