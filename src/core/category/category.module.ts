import { Module } from '@nestjs/common'
import { PrismaService } from '../../services/prisma.service'
import { CategoryRepositoryPrismaMySQL } from './data-access/category-prisma-mysql.repository'
import { ReadCategoryService } from './domain/service/read-category.service'
import { WriteCategoryService } from './domain/service/write-category.service'
import { CategoryController } from './entry-points/category.controller'
import { CategoryResolver } from './entry-points/category.resolver'

@Module({
  controllers: [CategoryController],
  providers: [
    WriteCategoryService,
    ReadCategoryService,
    CategoryResolver,
    {
      provide: 'CategoryRepository',
      useClass: CategoryRepositoryPrismaMySQL
    },
    PrismaService
  ],
  exports: [ReadCategoryService]
})
export class CategoryModule {}
