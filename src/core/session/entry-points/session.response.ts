import { PickType } from '@nestjs/swagger'
import { SessionDTO } from '../domain/session.dto'

export class SessionResponse extends PickType(SessionDTO, [
  'id',
  'idUser',
  'ip',
  'userAgent',
  'location',
  'deviceType',
  'active',
  'logoutAt',
  'expiredAt',
  'createdAt'
]) {}
