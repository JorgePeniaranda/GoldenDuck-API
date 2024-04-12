import { PickType } from '@nestjs/swagger'
import { CardDTO } from '../card.dto'

export class CreateCardDTO extends PickType(CardDTO, ['number', 'cvv', 'expiration']) {}
