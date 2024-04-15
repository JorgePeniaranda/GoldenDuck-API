import { InputType } from '@nestjs/graphql'
import { PickType } from '@nestjs/swagger'
import { MessageDTO } from '../message.dto'

@InputType()
export class UpdateMessageDTO extends PickType(MessageDTO, ['message']) {}
