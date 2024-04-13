import { PickType } from '@nestjs/swagger'
import { MessageDTO } from '../domain/messages.dto'

export class MessageResponse extends PickType(MessageDTO, [
  'id',
  'idSender',
  'idReceiver',
  'message',
  'read',
  'updatedAt',
  'createdAt',
  'deleted'
]) {
}
