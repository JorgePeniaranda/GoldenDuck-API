import { PickType } from '@nestjs/swagger'
import { CategoryDTO } from '../category.dto'

export class CreateCategoryDTO extends PickType(CategoryDTO, ['name']) {}
