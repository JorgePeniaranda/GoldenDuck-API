import { Inject, Injectable } from '@nestjs/common'
import { type Category } from '../category.entity'
import { type CategoryPrimitive } from '../category.primitive'
import { CategoryRepository } from '../category.repository'
import { type CreateErrorDTO } from '../dto/create-category'

@Injectable()
export class CategoryService {
  constructor (@Inject('CategoryRepository') private readonly categoryRepository: CategoryRepository) {}

  public async create (data: CreateErrorDTO): Promise<Category> {
    return await this.categoryRepository.create(data)
  }

  public async getAll (): Promise<Category[] | null> {
    return await this.categoryRepository.getAll()
  }

  public async find (id: CategoryPrimitive['id']): Promise<Category | null> {
    return await this.categoryRepository.find(id)
  }

  public async delete (id: CategoryPrimitive['id']): Promise<void> {
    await this.categoryRepository.delete(id)
  }
}
