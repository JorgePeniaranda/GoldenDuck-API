import { PickType as GQLPickType, InputType } from '@nestjs/graphql'
import { PickType } from '@nestjs/mapped-types'
import { PickType as SWGPickType } from '@nestjs/swagger'
import { UserDTO } from '../user.dto'

const keys = ['password'] as const

export class MPDeleteUserDTO extends PickType(UserDTO, keys) {}

@InputType()
export class GQLDeleteUserDTO extends GQLPickType(UserDTO, keys) {}

export class SWGDeleteUserDTO extends SWGPickType(UserDTO, keys) {}
