import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDate, IsNumber, IsPositive, IsString, MaxDate } from 'class-validator'
import { type ErrorPrimitive } from './error.primitive'

export class ErrorDTO implements ErrorPrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    id: ErrorPrimitive['id']

  /* ---------- NAME ---------- */
  @ApiProperty({
    example: 'UNKNOWN',
    type: String
  })
  @IsString()
    name: ErrorPrimitive['name']

  /* ---------- MESSAGE ---------- */
  @ApiProperty({
    example: 'An error occurred',
    type: String
  })
  @IsString()
    message: ErrorPrimitive['message']

  /* ---------- STACK ---------- */
  @ApiProperty({
    example: 'Error: An error occurred\n    at Function.<anonymous> (/app/src/core/error/infrastructure/error.controller.ts:12:15)',
    type: String
  })
  @IsString()
    stack: ErrorPrimitive['stack']

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
  @IsBoolean()
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
