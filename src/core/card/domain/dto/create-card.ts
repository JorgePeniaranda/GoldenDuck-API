import { InputType } from '@nestjs/graphql'
import { PickType } from '@nestjs/swagger'
import { CardDTO } from '../card.dto'

@InputType()
export class CreateCardDTO extends PickType(CardDTO, ['number', 'cvv', 'expiration']) {}
