import { IntersectionType as GQLIntersectionType, PartialType as GQLPartialType, PickType as GQLPickType, InputType } from '@nestjs/graphql'
import { IntersectionType, PartialType, PickType } from '@nestjs/mapped-types'
import { IntersectionType as SWGIntersectionType, PartialType as SWGPartialType, PickType as SWGPickType } from '@nestjs/swagger'
import { SessionDTO } from '../session.dto'

const keys = ['idUser', 'token'] as const

const optionalKeys = ['ip', 'userAgent', 'location', 'deviceType'] as const

export class CreateSessionDTO extends IntersectionType(
  PickType(SessionDTO, keys),
  PartialType(PickType(SessionDTO, optionalKeys))
) {}

@InputType()
export class GQLCreateSessionDTO extends GQLIntersectionType(
  GQLPickType(SessionDTO, keys),
  GQLPartialType(GQLPickType(SessionDTO, optionalKeys))
) {}

export class SWGCreateSessionDTO extends SWGIntersectionType(
  SWGPickType(SessionDTO, keys),
  SWGPartialType(SWGPickType(SessionDTO, optionalKeys))
) {}
