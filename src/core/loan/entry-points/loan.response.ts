import { ApiProperty } from '@nestjs/swagger'
import { type LoanPrimitive } from '../domain/loan.primitive'

export class LoanResponse implements LoanPrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    id: LoanPrimitive['id']

  /* ---------- ID ACCOUNT ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    idAccount: LoanPrimitive['idAccount']

  /* ---------- AMOUNT ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    amount: LoanPrimitive['amount']

  /* ---------- INTEREST ---------- */

  @ApiProperty({
    example: 1,
    type: Number
  })
    interest: LoanPrimitive['interest']

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
    updatedAt: LoanPrimitive['updatedAt']

  /* ---------- CREATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
    createdAt: LoanPrimitive['createdAt']

  /* ---------- CANCELED ---------- */
  @ApiProperty({
    example: true,
    type: Boolean
  })
    canceled: LoanPrimitive['canceled']

  constructor (loan: LoanPrimitive) {
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
