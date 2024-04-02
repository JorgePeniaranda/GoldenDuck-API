import { Module } from '@nestjs/common'
import { PrismaService } from '../shared/prisma.repository'
import { CategoryRepositoryPrismaMySQL } from './data-access/category-prisma-mysql.repository'
import { CategoryService } from './domain/service/category.service'
import { CategoryController } from './entry-points/category.controller'

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, {
    provide: 'CategoryRepository',
    useClass: CategoryRepositoryPrismaMySQL
  }, PrismaService]
})
export class CategoryModule {}
