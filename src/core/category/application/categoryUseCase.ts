import { type CategoryRepository } from '../domain/category.repository'
import { type CategoryEntity } from '../domain/category.entity'
import { type Category } from '../domain/category.value'

export class CategoryUseCase {
  constructor (private readonly categoryRepository: CategoryRepository) {}

  public async createCategory ({ name }: { name: CategoryEntity['name'] }): Promise<Category> {
    const createCategory = await this.categoryRepository.createCategory({ name })

    return createCategory
  }

  public async getAllCategory (): Promise<Category[] | null> {
    const AllCategories = await this.categoryRepository.getAllCategory()

    return AllCategories
  }

  public async findCategory ({ id }: { id: CategoryEntity['id'] }): Promise<Category | null> {
    const category = await this.categoryRepository.findCategory({ id })

    return category
  }

  public async updateCategory ({ id, name }: { id: CategoryEntity['id'], name: CategoryEntity['name'] }): Promise<Category> {
    const updatedCategory = await this.categoryRepository.updateCategory({ id, name })

    return updatedCategory
  }

  public async deleteCategory ({ id }: { id: CategoryEntity['id'] }): Promise<void> {
    await this.categoryRepository.deleteCategory({ id })
  }
}
