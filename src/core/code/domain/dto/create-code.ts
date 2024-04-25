import { UserDTO } from '@/core/user/domain/user.dto'
import { PartialType as GQLPartialType, PickType as GQLPickType, InputType } from '@nestjs/graphql'
import { PartialType, PickType } from '@nestjs/mapped-types'
import { PartialType as SWGPartialType, PickType as SWGPickType } from '@nestjs/swagger'

const keys = ['email', 'phoneNumber'] as const

export class CreateCodeDTO extends PartialType(PickType(UserDTO, keys)) {}

@InputType()
export class GQLCreateCodeDTO extends GQLPartialType(GQLPickType(UserDTO, keys)) {}

export class SWGCreateCodeDTO extends SWGPartialType(SWGPickType(UserDTO, keys)) {}
