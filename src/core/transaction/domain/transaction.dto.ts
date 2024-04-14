import { InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDate, IsNumber, IsPositive, MaxDate } from 'class-validator'
import { type TransactionPrimitive } from './transaction.primitive'

@InputType()
export class TransactionDTO implements TransactionPrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    id: TransactionPrimitive['id']

  /* ---------- ID SENDER ---------- */
  @ApiProperty({
    example: 2,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    idSender: TransactionPrimitive['idSender']

  /* ---------- ID RECEIVER ---------- */
  @ApiProperty({
    example: 3,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    idReceiver: TransactionPrimitive['idReceiver']

  /* ---------- AMOUNT ---------- */
  @ApiProperty({
    example: 1000,
    type: BigInt
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    amount: TransactionPrimitive['amount']

  /* ---------- ID CATEGORY ---------- */
  @ApiProperty({
    example: 4,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    idCategory?: TransactionPrimitive['idCategory']

  /* ---------- CREATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
    createdAt: TransactionPrimitive['createdAt']

  /* ---------- DELETED ---------- */
  @ApiProperty({
    example: true,
    type: Boolean
  })
  @IsBoolean()
    canceled: TransactionPrimitive['canceled']

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
