import { PickType as GQLPickType, InputType } from '@nestjs/graphql'
import { PickType } from '@nestjs/mapped-types'
import { PickType as SWGPickType } from '@nestjs/swagger'
import { CardDTO } from '../card.dto'

const keys = ['number', 'cvv', 'expiration'] as const

export class CreateCardDTO extends PickType(CardDTO, keys) {}

@InputType()
export class GQLCreateCardDTO extends GQLPickType(CardDTO, keys) {}

export class SWGCreateCardDTO extends SWGPickType(CardDTO, keys) {}
