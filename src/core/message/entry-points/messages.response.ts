import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { ApiProperty } from '@nestjs/swagger'
import { type MessagePrimitive } from '../domain/messages.primitive'

export class MessageResponse implements MessagePrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    id: MessagePrimitive['id']

  /* ---------- idSender ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    idSender: MessagePrimitive['idSender']

  /* ---------- idReceiver ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    idReceiver: MessagePrimitive['idReceiver']

  /* ---------- MESSAGE ---------- */
  @ApiProperty({
    example: 1000,
    type: BigInt
  })
    message: MessagePrimitive['message']

  /* ---------- READ ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    read: MessagePrimitive['read']

  /* ---------- UPDATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
    updatedAt: AccountPrimitive['updatedAt']

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
