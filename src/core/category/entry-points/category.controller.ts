import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { type Category } from '../domain/category.entity'
import { type CategoryPrimitive } from '../domain/category.primitive'
import { CreateErrorDTO } from '../domain/dto/create-category'
import { CategoryService } from '../domain/service/category.service'
import { CategoryResponse } from './category.response'

@ApiResponse({
  type: CategoryResponse
})
@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor (private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategory (): Promise<Category[]> {
    const categories = await this.categoryService.getAll()

    if (categories === null) {
      return []
    }

    return categories
  }

  @Post()
  async createCategory (@Body() data: CreateErrorDTO): Promise<Category> {
    const category = await this.categoryService.create(data)

    return category
  }

  @Get('/:id')
  async getCategory (
    @Param('id', new ParseIntPipe()) id: CategoryPrimitive['id']
  ): Promise<Category> {
    const category = await this.categoryService.find(id)

    if (category === null) {
      throw new NotFoundException()
    }

    return category
  }

  @Delete('/:id')
  async deleteCategory (
    @Param('id', new ParseIntPipe()) id: CategoryPrimitive['id']
  ): Promise<void> {
    await this.categoryService.delete(id)
  }
}
