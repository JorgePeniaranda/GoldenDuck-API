import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsAlpha,
  IsBoolean,
  IsDate,
  IsNumber,
  IsPositive,
  IsString,
  MaxDate
} from 'class-validator'
import { type CategoryPrimitive } from './category.primitive'

@ObjectType()
export class CategoryDTO implements CategoryPrimitive {
  /* ---------- ID ---------- */
  @Field(() => ID)
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    id: CategoryPrimitive['id']

  /* ---------- NAME ---------- */
  @Field()
  @ApiProperty({
    example: 'Category',
    type: String
  })
  @IsString()
  @IsAlpha()
    name: CategoryPrimitive['name']

  /* ---------- UPDATED AT ---------- */
  @Field()
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
    updatedAt: AccountPrimitive['updatedAt']

  /* ---------- CREATED AT ---------- */
  @Field()
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
    createdAt: AccountPrimitive['createdAt']

  /* ---------- DELETED ---------- */
  @Field()
  @ApiProperty({
    example: true,
    type: Boolean
  })
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
