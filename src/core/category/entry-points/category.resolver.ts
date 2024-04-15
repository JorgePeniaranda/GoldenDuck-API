import { Transaction } from '@/core/transaction/domain/transaction.entity'
import { GqlAuthGuard } from '@/guard/gql.guard'
import { CategoryErrorsMessages } from '@/messages/error/category'
import { NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Category } from '../domain/category.entity'
import { type CategoryPrimitive } from '../domain/category.primitive'
import { GQLCreateCategoryDTO } from '../domain/dto/create-category'
import { ReadCategoryService } from '../domain/service/read-category.service'
import { WriteCategoryService } from '../domain/service/write-category.service'

@Resolver(() => Category)
export class CategoryResolver {
  constructor (
    private readonly readCategoryService: ReadCategoryService,
    private readonly writeCategoryService: WriteCategoryService
    // private readonly readTransactionService: ReadTransactionService
  ) {}

  /* ---------- findAll ---------- */ // MARK: findAll
  @UseGuards(GqlAuthGuard)
  @Query(() => [Category], { name: 'find_all_category' })
  async findAll (): Promise<Category[]> {
    const categories = await this.readCategoryService.findAll()

    return categories
  }

  /* ---------- create ---------- */ // MARK: create
  @Mutation(() => [Category], { name: 'create_category' })
  async create (@Args('data') data: GQLCreateCategoryDTO): Promise<Category> {
    const category = await this.writeCategoryService.create(data)

    return category
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  @Query(() => [Category], { name: 'find_one_category' })
  async findOne (@Args('id', { type: () => Int }) id: CategoryPrimitive['id']): Promise<Category> {
    const category = await this.readCategoryService.findOne({ id })

    if (category === null) {
      throw new NotFoundException(CategoryErrorsMessages.NotFound)
    }

    return category
  }

  /* ---------- delete ---------- */ // MARK: delete
  @Mutation(() => [Category], { name: 'delete_category' })
  async delete (@Args('id', { type: () => Int }) id: CategoryPrimitive['id']): Promise<void> {
    await this.writeCategoryService.delete({ id })
  }

  /* ---------- category ---------- */ // MARK: category
  @ResolveField(() => [Transaction])
  async category (@Parent() _transaction: Transaction): Promise<Category> {
    throw new UnauthorizedException()

    // const category = this.readTransactionService.findByCategory({
    //   idCategory: transaction.idCategory
    // })
    // return category
  }
}
