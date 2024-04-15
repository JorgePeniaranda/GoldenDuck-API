import { CategoryErrorsMessages } from '@/messages/error/category'
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Category } from '../category.entity'
import { type CategoryPrimitive } from '../category.primitive'
import { CategoryRepository } from '../category.repository'
import { type CreateCategoryDTO } from '../dto/create-category'

@Injectable()
export class WriteCategoryService {
  constructor (
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository
  ) {}

  /* ---------- create ---------- */ // MARK: create
  public async create (data: CreateCategoryDTO): Promise<Category> {
    const checkCategory = await this.categoryRepository.findOne({
      name: data.name
    })

    if (checkCategory !== null) {
      throw new ConflictException(CategoryErrorsMessages.AlreadyExists)
    }

    const category = Category.create(data)

    return await this.categoryRepository.create(category)
  }

  /* ---------- delete ---------- */ // MARK: delete
  public async delete ({ id }: { id: CategoryPrimitive['id'] }): Promise<void> {
    const category = await this.categoryRepository.findOne({
      id
    })

    if (category === null) {
      throw new NotFoundException(CategoryErrorsMessages.NotFound)
    }

    await this.categoryRepository.delete(category)
  }
}
