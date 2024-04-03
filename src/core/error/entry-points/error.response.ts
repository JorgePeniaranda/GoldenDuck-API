import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { ApiProperty } from '@nestjs/swagger'
import { type ErrorPrimitive } from '../domain/error.primitive'

export class ErrorResponse implements ErrorPrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    id: ErrorPrimitive['id']

  /* ---------- NAME ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    name: ErrorPrimitive['name']

  /* ---------- MESSAGE ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    message: ErrorPrimitive['message']

  /* ---------- STACK ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    stack: ErrorPrimitive['stack']

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

  constructor (transaction: ErrorPrimitive) {
    this.id = transaction.id
    this.name = transaction.name
    this.message = transaction.message
    this.stack = transaction.stack
    this.updatedAt = transaction.updatedAt
    this.createdAt = transaction.createdAt
    this.deleted = transaction.deleted
  }
}
