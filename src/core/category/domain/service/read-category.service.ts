import { Inject, Injectable } from '@nestjs/common'
import { type Category } from '../category.entity'
import { type CategoryPrimitive } from '../category.primitive'
import { CategoryRepository } from '../category.repository'

@Injectable()
export class ReadCategoryService {
  constructor (
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository
  ) {}

  /* ---------- findAll ---------- */ // MARK: findAll
  public async findAll (): Promise<Category[]> {
    return await this.categoryRepository.findAll()
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  public async findOne ({
    id,
    name
  }: {
    id?: CategoryPrimitive['id']
    name?: CategoryPrimitive['name']
  }): Promise<Category | null> {
    return await this.categoryRepository.findOne({ id, name })
  }
}
