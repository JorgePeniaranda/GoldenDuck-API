import { PickType } from '@nestjs/swagger'
import { CardDTO } from '../card.dto'

export class CreateCardDTO extends PickType(CardDTO, ['idAccount', 'number', 'cvv', 'expiration']) { }
