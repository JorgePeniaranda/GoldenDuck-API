import { prisma } from '@/libs/prisma'
import { type CategoryRepository } from '../../domain/category.repository'
import { Category } from '../../domain/category.value'
import { type Alphabetic } from '@/valueObjects/string/alphabetic/alphabetic.value'
import { type CategoryEntity } from '../../domain/category.entity'

export class PrismaRepository implements CategoryRepository {
  public async createCategory ({
    name
  }: {
    name: Alphabetic
  }): Promise<Category> {
    const createdCategory = await prisma.category.create({
      data: {
        name: name.value
      }
    })

    return new Category(createdCategory)
  }

  public async getAllCategory (): Promise<Category[]> {
    const categories = await prisma.category.findMany()

    return categories.map((category) => new Category(category))
  }

  public async findCategory ({
    id
  }: {
    id?: CategoryEntity['id']
  }): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: {
        id: id?.value
      }
    })

    return category === null ? null : new Category(category)
  }

  public async updateCategory ({
    id,
    name
  }: {
    id: CategoryEntity['id']
    name: CategoryEntity['name']
  }): Promise<Category> {
    const updatedCategory = await prisma.category.update({
      where: {
        id: id.value,
        name: name.value
      },
      data: {
        name: name.value
      }
    })

    return new Category(updatedCategory)
  }

  public async deleteCategory ({
    id
  }: {
    id: CategoryEntity['id']
  }): Promise<void> {
    await prisma.category.delete({
      where: {
        id: id.value
      }
    })
  }
}
