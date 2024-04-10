import { PickType } from '@nestjs/swagger'
import { TransactionDTO } from '../transaction.dto'

export class CreateTransactionDTO extends PickType(TransactionDTO, ['from', 'to', 'amount']) {}
