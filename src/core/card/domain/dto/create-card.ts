import { InputType, PickType } from '@nestjs/graphql'
import { CardDTO } from '../card.dto'

@InputType()
export class CreateCardDTO extends PickType(CardDTO, ['number', 'cvv', 'expiration'] as const) {}
