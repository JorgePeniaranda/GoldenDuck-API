import { EntitiesName } from '@/constants/entities'
import { ENDPOINT_INFO } from '@/decorators/endpoint.decorator'
import { Messages } from '@/messages'
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
import { ApiTags } from '@nestjs/swagger'
import { type Category } from '../domain/category.entity'
import { type CategoryPrimitive } from '../domain/category.primitive'
import { CreateCategoryDTO, SWGCreateCategoryDTO } from '../domain/dto/create-category'
import { ReadCategoryService } from '../domain/service/read-category.service'
import { WriteCategoryService } from '../domain/service/write-category.service'
import { CategoryResponse } from './category.response'

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor (
    private readonly writeCategoryService: WriteCategoryService,
    private readonly readCategoryService: ReadCategoryService
  ) {}

  /* ---------- findAll ---------- */ // MARK: findAll
  @ENDPOINT_INFO({
    auth: false,
    response: CategoryResponse,
    isArray: true,
    status: 200
  })
  @Get()
  async findAll (): Promise<Category[]> {
    const categories = await this.readCategoryService.findAll()

    return categories
  }

  /* ---------- create ---------- */ // MARK: create
  @ENDPOINT_INFO({
    auth: true,
    body: SWGCreateCategoryDTO,
    response: CategoryResponse,
    status: 201
  })
  @Post()
  async create (@Body() data: CreateCategoryDTO): Promise<Category> {
    const category = await this.writeCategoryService.create(data)

    return category
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  @ENDPOINT_INFO({
    auth: true,
    response: CategoryResponse,
    status: 200
  })
  @Get('/:id')
  async findOne (@Param('id', new ParseIntPipe()) id: CategoryPrimitive['id']): Promise<Category> {
    const category = await this.readCategoryService.findOne({ id })

    if (category === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.CATEGORY))
    }

    return category
  }

  /* ---------- delete ---------- */ // MARK: delete
  @ENDPOINT_INFO({
    auth: true,
    status: 204
  })
  @HttpCode(204)
  @Delete('/:id')
  async delete (@Param('id', new ParseIntPipe()) id: CategoryPrimitive['id']): Promise<void> {
    await this.writeCategoryService.delete({ id })
  }
}
