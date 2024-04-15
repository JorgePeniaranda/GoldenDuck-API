import { PartialType as GQLPartialType, PickType as GQLPickType, InputType } from '@nestjs/graphql'
import { PartialType, PickType } from '@nestjs/mapped-types'
import { PartialType as SWGPartialType, PickType as SWGPickType } from '@nestjs/swagger'
import { UserDTO } from '../user.dto'

const keys = [
  'name',
  'lastName',
  'email',
  'phoneNumber',
  'password',
  'address',
  'imgUrl',
  'role'
] as const

export class UpdateUserDTO extends PartialType(
  PickType(UserDTO, keys)
) {}

@InputType()
export class GQLUpdateUserDTO extends GQLPartialType(
  GQLPickType(UserDTO, keys)
) {}

export class SWGUpdateUserDTO extends SWGPartialType(
  SWGPickType(UserDTO, keys)
) {}
