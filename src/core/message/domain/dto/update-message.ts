import { InputType } from '@nestjs/graphql'
import { PickType } from '@nestjs/mapped-types'
import { PickType as GQLPickType, PickType as SWGPickType } from '@nestjs/swagger'
import { MessageDTO } from '../message.dto'

const keys = ['message'] as const

export class UpdateMessageDTO extends PickType(MessageDTO, keys) {}

@InputType()
export class GQLUpdateMessageDTO extends GQLPickType(MessageDTO, keys) {}

export class SWGUpdateMessageDTO extends SWGPickType(MessageDTO, keys) {}
