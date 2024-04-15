import { UserDTO } from '@/core/user/domain/user.dto'
import { PickType as GQLPickType, InputType } from '@nestjs/graphql'
import { PickType } from '@nestjs/mapped-types'
import { PickType as SWGPickType } from '@nestjs/swagger'

const keys = ['email', 'password'] as const

export class LoginDTO extends PickType(UserDTO, keys) {}

@InputType()
export class GQLLoginDTO extends GQLPickType(UserDTO, keys) {}

export class SWGLoginDTO extends SWGPickType(UserDTO, keys) {}
