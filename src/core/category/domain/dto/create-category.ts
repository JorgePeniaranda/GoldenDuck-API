import { PickType as GQLPickType, InputType } from '@nestjs/graphql'
import { PickType } from '@nestjs/mapped-types'
import { PickType as SWGPickType } from '@nestjs/swagger'
import { CategoryDTO } from '../category.dto'

const keys = ['name'] as const

export class CreateCategoryDTO extends PickType(CategoryDTO, keys) {}

@InputType()
export class GQLCreateCategoryDTO extends GQLPickType(CategoryDTO, keys) {}

export class SWGCreateCategoryDTO extends SWGPickType(CategoryDTO, keys) {}
