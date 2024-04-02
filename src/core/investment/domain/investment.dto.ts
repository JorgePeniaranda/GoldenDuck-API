import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDate, IsNumber, IsPositive, IsString, MaxDate } from 'class-validator'
import { type InvestmentPrimitive } from './investment.primitive'

export class InvestmentDTO implements InvestmentPrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    id: InvestmentPrimitive['id']

  /* ---------- ID ACCOUNT ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    idAccount: InvestmentPrimitive['idAccount']

  /* ---------- AMOUNT ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    amount: InvestmentPrimitive['amount']

  /* ---------- INTEREST ---------- */

  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false })
    interest: InvestmentPrimitive['interest']

  /* ---------- UPDATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
    dateEnd: Date

  /* ---------- UPDATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
    updatedAt: InvestmentPrimitive['updatedAt']

  /* ---------- CREATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
    createdAt: InvestmentPrimitive['createdAt']

  /* ---------- CANCELED ---------- */
  @ApiProperty({
    example: true,
    type: Boolean
  })
  @IsString()
  @IsBoolean()
    canceled: InvestmentPrimitive['canceled']

  constructor (investment: InvestmentPrimitive) {
    this.id = investment.id
    this.idAccount = investment.idAccount
    this.amount = investment.amount
    this.interest = investment.interest
    this.dateEnd = investment.dateEnd
    this.updatedAt = investment.updatedAt
    this.createdAt = investment.createdAt
    this.canceled = investment.canceled
  }
}
