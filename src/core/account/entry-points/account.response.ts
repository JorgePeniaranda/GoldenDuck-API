import { PickType } from '@nestjs/swagger'
import { AccountDTO } from '../domain/account.dto'

export class AccountResponse extends PickType(AccountDTO, [
  'id',
  'idUser',
  'balance',
  'updatedAt',
  'createdAt',
  'deleted'
]) {}
