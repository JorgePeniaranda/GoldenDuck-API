import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDate, IsNumber, IsPositive, IsString, MaxDate } from 'class-validator'
import { type MessagePrimitive } from './message.primitive'

export class MessageDTO implements MessagePrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    id: MessagePrimitive['id']

  /* ---------- ID SENDER ---------- */
  @ApiProperty({
    example: 2,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    idSender: MessagePrimitive['idSender']

  /* ---------- ID RECEIVER ---------- */
  @ApiProperty({
    example: 3,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    idReceiver: MessagePrimitive['idReceiver']

  /* ---------- MESSAGE ---------- */
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: BigInt
  })
  @IsString()
    message: MessagePrimitive['message']

  /* ---------- READ ---------- */
  @ApiProperty({
    example: true,
    type: Boolean
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
    updatedAt: MessagePrimitive['updatedAt']

  /* ---------- CREATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
    createdAt: MessagePrimitive['createdAt']

  /* ---------- DELETED ---------- */
  @ApiProperty({
    example: false,
    type: Boolean
  })
  @IsBoolean()
    deleted: boolean

  constructor (transaction: MessagePrimitive) {
    this.id = transaction.id
    this.idSender = transaction.idSender
    this.idReceiver = transaction.idReceiver
    this.message = transaction.message
    this.read = transaction.read
    this.updatedAt = transaction.updatedAt
    this.createdAt = transaction.createdAt
    this.deleted = transaction.deleted
  }
}
