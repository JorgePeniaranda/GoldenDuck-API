import { PickType as GQLPickType, InputType } from '@nestjs/graphql'
import { PickType } from '@nestjs/mapped-types'
import { PickType as SWGPickType } from '@nestjs/swagger'
import { TransactionDTO } from '../transaction.dto'

const keys = ['idReceiver', 'amount'] as const

export class CreateTransactionDTO extends PickType(TransactionDTO, keys) {}

@InputType()
export class GQLCreateTransactionDTO extends GQLPickType(TransactionDTO, keys) {}

export class SWGCreateTransactionDTO extends SWGPickType(TransactionDTO, keys) {}
