import { PickType } from '@nestjs/swagger'
import { SessionDTO } from '../session.dto'

export class CreateSessionDTO extends PickType(SessionDTO, [
  'idUser',
  'ip',
  'userAgent',
  'location',
  'deviceType',
  'token'
]) {}
