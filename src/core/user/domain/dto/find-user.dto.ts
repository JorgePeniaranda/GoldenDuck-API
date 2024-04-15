import { PartialType as GQLPartialType, PickType as GQLPickType, InputType } from '@nestjs/graphql'
import { PartialType, PickType } from '@nestjs/mapped-types'
import { PartialType as SWGPartialType, PickType as SWGPickType } from '@nestjs/swagger'
import { UserDTO } from '../user.dto'

const keys = ['dni', 'email', 'phoneNumber'] as const

export class FindUserDTO extends PartialType(
  PickType(UserDTO, keys)
) {}

@InputType()
export class GQLFindUserDTO extends GQLPartialType(
  GQLPickType(UserDTO, keys)
) {}

export class SWGFindUserDTO extends SWGPartialType(
  SWGPickType(UserDTO, keys)
) {}
