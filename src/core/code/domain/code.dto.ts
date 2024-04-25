import { Field, ID, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsAlphanumeric,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsPositive,
  MaxDate,
  MaxLength,
  MinLength
} from 'class-validator'
import { CodeType, type CodePrimitive } from './code.primitive'
import { VALIDATION_CODE_LENGTH } from '@/constants'

@InputType()
export class CodeDTO implements CodePrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
  @Field(() => ID)
    id: CodePrimitive['id']

  /* ---------- ID-USER ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
  @Field(() => Number)
    idUser: CodePrimitive['idUser']

  /* ---------- CODE ---------- */
  @ApiProperty({
    example: 'OZ2X3Y',
    type: Number
  })
  @IsAlphanumeric()
  @MaxLength(VALIDATION_CODE_LENGTH)
  @MinLength(VALIDATION_CODE_LENGTH)
  @Field(() => String)
    code: CodePrimitive['code']

  /* ---------- TYPE ---------- */
  @ApiProperty({
    example: 'EMAIL',
    type: String
  })
  @IsEnum(CodeType)
  @Field(() => String)
    type: CodePrimitive['type']

  /* ---------- EXPIRED-AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @Field(() => Date)
    expiredAt: CodePrimitive['expiredAt']

  /* ---------- UPDATED-AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
  @Field(() => Date)
    updatedAt: CodePrimitive['updatedAt']

  /* ---------- CREATED-AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
  @Field(() => Date)
    createdAt: CodePrimitive['createdAt']

  /* ---------- ID ---------- */
  @ApiProperty({
    example: true,
    type: Boolean
  })
  @IsBoolean()
  @Field(() => Boolean)
    expired: CodePrimitive['expired']
}
