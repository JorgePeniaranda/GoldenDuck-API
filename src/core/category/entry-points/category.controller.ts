import { CategoryErrorsMessages } from '@/messages/error/category'
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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { type Category } from '../domain/category.entity'
import { type CategoryPrimitive } from '../domain/category.primitive'
import { CreateErrorDTO } from '../domain/dto/create-category'
import { CategoryService } from '../domain/service/category.service'
import { CategoryResponse } from './category.response'

@ApiResponse({
  type: CategoryResponse
})
@ApiTags('Category')
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor (private readonly categoryService: CategoryService) {}

  @Get()
  async findAll (): Promise<Category[]> {
    const categories = await this.categoryService.findAll()

    return categories
  }

  @Post()
  async create (@Body() data: CreateErrorDTO): Promise<Category> {
    const category = await this.categoryService.create(data)

    return category
  }

  @Get('/:id')
  async findOne (
    @Param('id', new ParseIntPipe()) id: CategoryPrimitive['id']
  ): Promise<Category> {
    const category = await this.categoryService.findOne({ id })

    if (category === null) {
      throw new NotFoundException(CategoryErrorsMessages.NotFound)
    }

    return category
  }

  @Delete('/:id')
  async delete (
    @Param('id', new ParseIntPipe()) id: CategoryPrimitive['id']
  ): Promise<void> {
    await this.categoryService.delete({ id })
  }
}
