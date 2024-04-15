import { PartialType as GQLPartialType, InputType, PickType } from '@nestjs/graphql'
import { PartialType } from '@nestjs/mapped-types'
import { PartialType as SWGPartialType } from '@nestjs/swagger'
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

export class MPUpdateUserDTO extends PartialType(
  PickType(UserDTO, keys)
) {}

@InputType()
export class GQLUpdateUserDTO extends GQLPartialType(
  PickType(UserDTO, keys)
) {}

export class SWGUpdateUserDTO extends SWGPartialType(
  PickType(UserDTO, keys)
) {}
