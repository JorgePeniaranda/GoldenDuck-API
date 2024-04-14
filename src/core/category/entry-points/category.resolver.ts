import { Public } from '@/decorators/public.decorator'
import { GqlAuthGuard } from '@/guard/gql.guard'
import { NotFoundException, UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { Category } from '../domain/category.entity'
import { ReadCategoryService } from '../domain/service/read-category.service'

@Resolver()
export class CategoryResolver {
  constructor (
    private readonly readCategoryService: ReadCategoryService
    // private readonly writeCategoryService: WriteCategoryService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Category])
  async findAll (): Promise<Category[]> {
    return await this.readCategoryService.findAll()
  }

  @Public()
  @Query((_returns) => Category, { name: 'category' })
  async findOne (@Args('id') id: number): Promise<Category> {
    const category = await this.readCategoryService.findOne({ id })

    if (category === null) {
      throw new NotFoundException('Category not found')
    }

    return category
  }
}
