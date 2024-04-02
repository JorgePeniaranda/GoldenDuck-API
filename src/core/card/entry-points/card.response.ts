import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  MaxDate
} from 'class-validator'
import { type CardPrimitive } from '../domain/card.primitive'

export class CardResponse implements CardPrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    id: CardPrimitive['id']

  /* ---------- IDACCOUNT ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    idAccount: CardPrimitive['idAccount']

  /* ---------- NUMBER ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber()
  @Length(100000000000000, 999999999999999)
    number: CardPrimitive['number']

  /* ---------- CVV ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber()
  @Length(100, 999)
    cvv: CardPrimitive['cvv']

  /* ---------- EXPIRATION ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
    expiration: CardPrimitive['expiration']

  /* ---------- UPDATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
    updatedAt: CardPrimitive['updatedAt']

  /* ---------- CREATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
    createdAt: CardPrimitive['createdAt']

  /* ---------- DELETED ---------- */
  @ApiProperty({
    example: true,
    type: Boolean
  })
  @IsString()
  @IsBoolean()
    deleted: boolean

  constructor (transaction: CardPrimitive) {
    this.id = transaction.id
    this.idAccount = transaction.idAccount
    this.number = transaction.number
    this.cvv = transaction.cvv
    this.expiration = transaction.expiration
    this.updatedAt = transaction.updatedAt
    this.createdAt = transaction.createdAt
    this.deleted = transaction.deleted
  }
}
