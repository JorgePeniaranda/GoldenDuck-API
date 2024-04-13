import { PickType } from '@nestjs/swagger'
import { ErrorDTO } from '../domain/error.dto'

export class ErrorResponse extends PickType(ErrorDTO, [
  'id',
  'name',
  'message',
  'stack',
  'updatedAt',
  'createdAt',
  'deleted'
]) {}
