import { PickType as GQLPickType, InputType } from '@nestjs/graphql'
import { PickType } from '@nestjs/mapped-types'
import { PickType as SWGPickType } from '@nestjs/swagger'
import { ErrorDTO } from '../error.dto'

const keys = ['name', 'message', 'stack'] as const

export class CreateErrorDTO extends PickType(ErrorDTO, keys) {}

@InputType()
export class GQLCreateErrorDTO extends GQLPickType(ErrorDTO, keys) {}

export class SWGCreateErrorDTO extends SWGPickType(ErrorDTO, keys) {}
