import { PickType } from '@nestjs/swagger'
import { MessageDTO } from '../messages.dto'

export class UpdateMessageDTO extends PickType(MessageDTO, ['message']) {}
