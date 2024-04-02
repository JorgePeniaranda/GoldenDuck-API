import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsPositive,
  IsString,
  MaxDate
} from 'class-validator'
import { type MessagePrimitive } from './messages.primitive'

export class MessageDTO implements MessagePrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    id: MessagePrimitive['id']

  /* ---------- FROM ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    from: MessagePrimitive['from']

  /* ---------- TO ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    to: MessagePrimitive['to']

  /* ---------- MESSAGE ---------- */
  @ApiProperty({
    example: 1000,
    type: BigInt
  })
  @IsString()
    message: MessagePrimitive['message']

  /* ---------- READ ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsBoolean()
    read: MessagePrimitive['read']

  /* ---------- UPDATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
    updatedAt: AccountPrimitive['updatedAt']

  /* ---------- CREATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
    createdAt: AccountPrimitive['createdAt']

  /* ---------- DELETED ---------- */
  @ApiProperty({
    example: true,
    type: Boolean
  })
  @IsString()
  @IsBoolean()
    deleted: boolean

  constructor (transaction: MessagePrimitive) {
    this.id = transaction.id
    this.from = transaction.from
    this.to = transaction.to
    this.message = transaction.message
    this.read = transaction.read
    this.updatedAt = transaction.updatedAt
    this.createdAt = transaction.createdAt
    this.deleted = transaction.deleted
  }
}
