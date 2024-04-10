import { Inject, Injectable } from '@nestjs/common'
import { type Category } from '../category.entity'
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
    return await this.categoryRepository.create(data)
  }

  public async findAll (): Promise<Category[] | null> {
    return await this.categoryRepository.findAll()
  }

  public async findOne (id: CategoryPrimitive['id']): Promise<Category | null> {
    return await this.categoryRepository.findOne(id)
  }

  public async delete (id: CategoryPrimitive['id']): Promise<void> {
    await this.categoryRepository.delete(id)
  }
}
