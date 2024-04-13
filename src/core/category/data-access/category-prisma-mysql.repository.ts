import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { Category } from '../domain/category.entity'
import { type CategoryPrimitive } from '../domain/category.primitive'
import { type CategoryRepository } from '../domain/category.repository'

@Injectable()
export class CategoryRepositoryPrismaMySQL implements CategoryRepository {
  constructor (private readonly prisma: PrismaService) {}

  public async create (data: Category): Promise<Category> {
    const category = await this.prisma.category.create({
      data: {
        ...data.toJSON(),
        id: undefined
      }
    })

    return new Category(category)
  }

  public async findAll (): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      where: {
        deleted: false
      }
    })

    return categories.map(category => new Category(category))
  }

  public async findOne ({
    id,
    name
  }: {
    id?: CategoryPrimitive['id']
    name?: CategoryPrimitive['name']
  }): Promise<Category | null> {
    const category = await this.prisma.category.findFirst({
      where: {
        OR: [{ id }, { name }],
        deleted: false
      }
    })

    return category !== null ? new Category(category) : null
  }

  public async delete (data: Category): Promise<void> {
    await this.prisma.category.delete({
      where: data.toJSON()
    })
  }
}
