import { InputType } from '@nestjs/graphql'
import { PickType } from '@nestjs/swagger'
import { TransactionDTO } from '../transaction.dto'

@InputType()
export class CreateTransactionDTO extends PickType(TransactionDTO, ['idReceiver', 'amount']) {}
