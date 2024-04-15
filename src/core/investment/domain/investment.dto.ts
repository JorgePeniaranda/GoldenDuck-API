import { Field, ID, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDate, IsNumber, IsPositive, MaxDate } from 'class-validator'
import { type InvestmentPrimitive } from './investment.primitive'

@InputType()
export class InvestmentDTO implements InvestmentPrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
  @Field(() => ID)
    id: InvestmentPrimitive['id']

  /* ---------- ID ACCOUNT ---------- */
  @ApiProperty({
    example: 2,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
  @Field(() => Number)
    idAccount: InvestmentPrimitive['idAccount']

  /* ---------- AMOUNT ---------- */
  @ApiProperty({
    example: 1000,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
  @Field(() => Number)
    amount: InvestmentPrimitive['amount']

  /* ---------- INTEREST ---------- */

  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Field(() => Number)
    interest: InvestmentPrimitive['interest']

  /* ---------- DATE END ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @Field(() => Date)
    dateEnd: InvestmentPrimitive['dateEnd']

  /* ---------- UPDATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
  @Field(() => Date)
    updatedAt: InvestmentPrimitive['updatedAt']

  /* ---------- CREATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
  @Field(() => Date)
    createdAt: InvestmentPrimitive['createdAt']

  /* ---------- CANCELED ---------- */
  @ApiProperty({
    example: true,
    type: Boolean
  })
  @IsBoolean()
  @Field(() => Boolean)
    canceled: InvestmentPrimitive['canceled']
}
