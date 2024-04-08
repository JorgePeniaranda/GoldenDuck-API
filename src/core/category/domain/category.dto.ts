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
import { type CategoryPrimitive } from './category.primitive'

export class CategoryDTO implements CategoryPrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    id: CategoryPrimitive['id']

  /* ---------- NAME ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsString()
    name: CategoryPrimitive['name']

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

  constructor (transaction: CategoryPrimitive) {
    this.id = transaction.id
    this.name = transaction.name
    this.updatedAt = transaction.updatedAt
    this.createdAt = transaction.createdAt
    this.deleted = transaction.deleted
  }
}