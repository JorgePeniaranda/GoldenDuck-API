import { PickType } from '@nestjs/swagger'
import { TransactionDTO } from '../domain/transaction.dto'

export class TransactionResponse extends PickType(TransactionDTO, [
  'id',
  'idSender',
  'idReceiver',
  'amount',
  'idCategory',
  'createdAt',
  'canceled'
]) {}
