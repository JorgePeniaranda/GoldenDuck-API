import { PickType } from '@nestjs/swagger'
import { CodeDTO } from '../domain/code.dto'

export class CodeResponse extends PickType(CodeDTO, [
  'id',
  'idUser',
  'type',
  'expiredAt',
  'updatedAt',
  'createdAt',
  'expired'
]) {}
