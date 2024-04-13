import { PickType } from '@nestjs/swagger'
import { MessageDTO } from '../message.dto'

export class CreateMessageDTO extends PickType(MessageDTO, ['message']) {}
