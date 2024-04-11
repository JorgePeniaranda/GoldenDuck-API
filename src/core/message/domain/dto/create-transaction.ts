import { PickType } from '@nestjs/swagger'
import { MessageDTO } from '../messages.dto'

export class CreateMessageDTO extends PickType(MessageDTO, ['from', 'to', 'message']) {}
