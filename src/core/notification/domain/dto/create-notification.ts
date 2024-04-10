import { PickType } from '@nestjs/swagger'
import { NotificationDTO } from '../notification.dto'

export class CreateNotificationDTO extends PickType(NotificationDTO, ['idAccount', 'message']) {}
