import { PickType } from '@nestjs/swagger'
import { CategoryDTO } from '../category.dto'

export class CreateErrorDTO extends PickType(CategoryDTO, ['name']) {}
