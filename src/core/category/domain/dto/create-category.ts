import { InputType, PickType } from '@nestjs/graphql'
import { CategoryDTO } from '../category.dto'

@InputType()
export class CreateCategoryDTO extends PickType(CategoryDTO, ['name'] as const) {}
