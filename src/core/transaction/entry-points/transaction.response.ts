import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { ApiProperty } from '@nestjs/swagger'
import { type TransactionPrimitive } from '../domain/transaction.primitive'

export class TransactionResponse implements TransactionPrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    id: TransactionPrimitive['id']

  /* ---------- FROM ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    idSender: TransactionPrimitive['idSender']

  /* ---------- TO ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    idReceiver: TransactionPrimitive['idReceiver']

  /* ---------- AMOUNT ---------- */
  @ApiProperty({
    example: 1000,
    type: BigInt
  })
    amount: TransactionPrimitive['amount']

  /* ---------- ID CATEGORY ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    idCategory?: TransactionPrimitive['idCategory']

  /* ---------- CREATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
    createdAt: AccountPrimitive['createdAt']

  /* ---------- DELETED ---------- */
  @ApiProperty({
    example: true,
    type: Boolean
  })
    canceled: boolean

  constructor (transaction: TransactionPrimitive) {
    this.id = transaction.id
    this.idSender = transaction.idSender
    this.idReceiver = transaction.idReceiver
    this.amount = transaction.amount
    this.idCategory = transaction.idCategory
    this.createdAt = transaction.createdAt
    this.canceled = transaction.canceled
  }
}
