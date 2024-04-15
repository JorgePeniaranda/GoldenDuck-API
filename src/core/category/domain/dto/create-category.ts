import { InputType } from '@nestjs/graphql'
import { PickType } from '@nestjs/swagger'
import { CategoryDTO } from '../category.dto'

@InputType()
export class CreateCategoryDTO extends PickType(CategoryDTO, ['name']) {}
