import { InputType } from '@nestjs/graphql'
import { PickType } from '@nestjs/swagger'
import { MessageDTO } from '../message.dto'

@InputType()
export class CreateMessageDTO extends PickType(MessageDTO, ['message']) {}
