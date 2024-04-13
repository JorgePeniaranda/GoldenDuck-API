import { PickType } from '@nestjs/swagger'
import { CategoryDTO } from '../domain/category.dto'

export class CategoryResponse extends PickType(CategoryDTO, [
  'id',
  'name',
  'updatedAt',
  'createdAt',
  'deleted'
]) {}
