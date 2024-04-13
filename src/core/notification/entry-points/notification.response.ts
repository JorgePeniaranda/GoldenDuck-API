import { PickType } from '@nestjs/swagger'
import { NotificationDTO } from '../domain/notification.dto'

export class NotificationResponse extends PickType(NotificationDTO, [
  'id',
  'idUser',
  'message',
  'read',
  'updatedAt',
  'createdAt'
]) {}
