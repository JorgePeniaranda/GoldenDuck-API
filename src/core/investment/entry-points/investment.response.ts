import { ApiProperty } from '@nestjs/swagger'
import { type InvestmentPrimitive } from '../domain/investment.primitive'

export class LoanResponse implements InvestmentPrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    id: InvestmentPrimitive['id']

  /* ---------- ID ACCOUNT ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    idAccount: InvestmentPrimitive['idAccount']

  /* ---------- AMOUNT ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    amount: InvestmentPrimitive['amount']

  /* ---------- INTEREST ---------- */

  @ApiProperty({
    example: 1,
    type: Number
  })
    interest: InvestmentPrimitive['interest']

  /* ---------- UPDATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
    dateEnd: Date

  /* ---------- UPDATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
    updatedAt: InvestmentPrimitive['updatedAt']

  /* ---------- CREATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
    createdAt: InvestmentPrimitive['createdAt']

  /* ---------- CANCELED ---------- */
  @ApiProperty({
    example: true,
    type: Boolean
  })
    canceled: InvestmentPrimitive['canceled']

  constructor (loan: InvestmentPrimitive) {
    this.id = loan.id
    this.idAccount = loan.idAccount
    this.amount = loan.amount
    this.interest = loan.interest
    this.dateEnd = loan.dateEnd
    this.updatedAt = loan.updatedAt
    this.createdAt = loan.createdAt
    this.canceled = loan.canceled
  }
}
