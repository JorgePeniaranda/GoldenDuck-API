import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { Category } from '../domain/category.entity'
import { type CategoryPrimitive } from '../domain/category.primitive'
import { type CategoryRepository } from '../domain/category.repository'
import { type CreateErrorDTO } from '../domain/dto/create-category'

@Injectable()
export class CategoryRepositoryPrismaMySQL implements CategoryRepository {
  constructor (private readonly prisma: PrismaService) {}

  public async create (data: CreateErrorDTO): Promise<Category> {
    const newCategory = await this.prisma.category.create({
      data
    })

    return new Category(newCategory)
  }

  public async getAll (): Promise<Category[] | null> {
    const categories = await this.prisma.category.findMany()

    return categories.map(category => new Category(category))
  }

  public async find (id: CategoryPrimitive['id']): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: {
        id
      }
    })

    return category !== null ? new Category(category) : null
  }

  public async delete (id: CategoryPrimitive['id']): Promise<void> {
    await this.prisma.category.delete({
      where: {
        id
      }
    })
  }
}
