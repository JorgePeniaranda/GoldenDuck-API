import { CategoryErrorsMessages } from '@/messages/error/category'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post
} from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { type Category } from '../domain/category.entity'
import { type CategoryPrimitive } from '../domain/category.primitive'
import { SWGCreateCategoryDTO } from '../domain/dto/create-category'
import { ReadCategoryService } from '../domain/service/read-category.service'
import { WriteCategoryService } from '../domain/service/write-category.service'
import { CategoryResponse } from './category.response'

@ApiResponse({
  type: CategoryResponse
})
@ApiTags('Category')
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor (
    private readonly writeCategoryService: WriteCategoryService,
    private readonly readCategoryService: ReadCategoryService
  ) {}

  @Get()
  async findAll (): Promise<Category[]> {
    const categories = await this.readCategoryService.findAll()

    return categories
  }

  @Post()
  async create (@Body() data: SWGCreateCategoryDTO): Promise<Category> {
    const category = await this.writeCategoryService.create(data)

    return category
  }

  @Get('/:id')
  async findOne (@Param('id', new ParseIntPipe()) id: CategoryPrimitive['id']): Promise<Category> {
    const category = await this.readCategoryService.findOne({ id })

    if (category === null) {
      throw new NotFoundException(CategoryErrorsMessages.NotFound)
    }

    return category
  }

  @HttpCode(204)
  @Delete('/:id')
  async delete (@Param('id', new ParseIntPipe()) id: CategoryPrimitive['id']): Promise<void> {
    await this.writeCategoryService.delete({ id })
  }
}
