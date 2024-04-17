import { Field, ID, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsAlpha,
  IsBoolean,
  IsDate,
  IsNumber,
  IsPositive,
  IsString,
  MaxDate,
  MaxLength
} from 'class-validator'
import { type CategoryPrimitive } from './category.primitive'

@InputType()
export class CategoryDTO implements CategoryPrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
  @Field(() => ID)
    id: CategoryPrimitive['id']

  /* ---------- NAME ---------- */
  @ApiProperty({
    example: 'Category',
    type: String
  })
  @IsString()
  @IsAlpha()
  @MaxLength(255)
  @Field(() => String)
    name: CategoryPrimitive['name']

  /* ---------- UPDATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
  @Field(() => Date)
    updatedAt: CategoryPrimitive['updatedAt']

  /* ---------- CREATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
  @Field(() => Date)
    createdAt: CategoryPrimitive['createdAt']

  /* ---------- DELETED ---------- */
  @ApiProperty({
    example: true,
    type: Boolean
  })
  @IsBoolean()
  @Field(() => Boolean)
    deleted: CategoryPrimitive['deleted']
}
