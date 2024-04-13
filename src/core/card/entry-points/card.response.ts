import { PickType } from '@nestjs/swagger'
import { CardDTO } from '../domain/card.dto'

export class CardResponse extends PickType(CardDTO, [
  'id',
  'idAccount',
  'number',
  'updatedAt',
  'createdAt',
  'deleted'
]) {}
