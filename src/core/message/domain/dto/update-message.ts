import { PickType } from '@nestjs/swagger'
import { MessageDTO } from '../message.dto'

export class UpdateMessageDTO extends PickType(MessageDTO, ['message']) {}
