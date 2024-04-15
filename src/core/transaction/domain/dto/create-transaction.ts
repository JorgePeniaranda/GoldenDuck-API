import { InputType, PickType } from '@nestjs/graphql'
import { TransactionDTO } from '../transaction.dto'

@InputType()
export class CreateTransactionDTO extends PickType(TransactionDTO, ['idReceiver', 'amount']) {}
