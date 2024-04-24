import { PickType as GQLPickType, InputType } from '@nestjs/graphql'
import { PickType } from '@nestjs/mapped-types'
import { PickType as SWGPickType } from '@nestjs/swagger'
import { UserDTO } from '../user.dto'

const keys = [
  'name',
  'lastName',
  'dni',
  'email',
  'phoneNumber',
  'password',
  'address',
  'birthDate',
  'sex'
] as const

export class CreateUserDTO extends PickType(UserDTO, keys) {}

@InputType()
export class GQLCreateUserDTO extends GQLPickType(UserDTO, keys) {}

export class SWGCreateUserDTO extends SWGPickType(UserDTO, keys) {}
