import { CategoryErrorsMessages } from '@/messages/error/category'
import { Inject, Injectable } from '@nestjs/common'
import { Category } from '../category.entity'
import { type CategoryPrimitive } from '../category.primitive'
import { CategoryRepository } from '../category.repository'
import { type CreateErrorDTO } from '../dto/create-category'

@Injectable()
export class CategoryService {
  constructor (
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository
  ) {}

  public async create (data: CreateErrorDTO): Promise<Category> {
    const checkCategory = await this.categoryRepository.findOne({
      name: data.name
    })

    if (checkCategory !== null) {
      throw new Error(CategoryErrorsMessages.AlreadyExists)
    }

    const category = Category.create(data)

    return await this.categoryRepository.create(category)
  }

  public async findAll (): Promise<Category[]> {
    return await this.categoryRepository.findAll()
  }

  public async findOne ({ id, name }: {
    id?: CategoryPrimitive['id']
    name?: CategoryPrimitive['name']
  }): Promise<Category | null> {
    return await this.categoryRepository.findOne({ id, name })
  }

  public async delete ({ id }: { id: CategoryPrimitive['id'] }): Promise<void> {
    const category = await this.categoryRepository.findOne({
      id
    })

    if (category === null) {
      throw new Error(CategoryErrorsMessages.NotFound)
    }

    await this.categoryRepository.delete(category)
  }
}
