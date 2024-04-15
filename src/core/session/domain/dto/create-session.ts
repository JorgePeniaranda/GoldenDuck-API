import { InputType, IntersectionType, PartialType, PickType } from '@nestjs/graphql'
import { SessionDTO } from '../session.dto'

@InputType()
export class CreateSessionDTO extends IntersectionType(
  PickType(SessionDTO, ['idUser', 'token']),
  PartialType(PickType(SessionDTO, ['ip', 'userAgent', 'location', 'deviceType']))
) {}
