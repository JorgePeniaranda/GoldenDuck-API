import { PickType as GQLPickType, InputType } from '@nestjs/graphql'
import { PickType } from '@nestjs/mapped-types'
import { PickType as SWGPickType } from '@nestjs/swagger'
import { CodeDTO } from '../code.dto'

const keys = ['code'] as const

export class VerifyCodeDTO extends PickType(CodeDTO, keys) {}

@InputType()
export class GQLVerifyCodeDTO extends GQLPickType(CodeDTO, keys) {}

export class SWGVerifyCodeDTO extends SWGPickType(CodeDTO, keys) {}
