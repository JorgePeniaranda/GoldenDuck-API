import { Field, ID, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDate, IsNumber, IsPositive, Length, MaxDate } from 'class-validator'
import { type CardPrimitive } from './card.primitive'

@InputType()
export class CardDTO implements CardPrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
  @Field(() => ID)
    id: CardPrimitive['id']

  /* ---------- IDACCOUNT ---------- */
  @ApiProperty({
    example: 2,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
  @Field(() => Number)
    idAccount: CardPrimitive['idAccount']

  /* ---------- NUMBER ---------- */
  @ApiProperty({
    example: 374245455400126,
    type: Number
  })
  @IsNumber()
  @Length(100000000000000, 999999999999999)
  @Field(() => Number)
    number: CardPrimitive['number']

  /* ---------- CVV ---------- */
  @ApiProperty({
    example: 132,
    type: Number
  })
  @IsNumber()
  @Length(100, 999)
  @Field(() => Number)
    cvv: CardPrimitive['cvv']

  /* ---------- EXPIRATION ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @Field(() => Date)
    expiration: CardPrimitive['expiration']

  /* ---------- UPDATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
  @Field(() => Date)
    updatedAt: CardPrimitive['updatedAt']

  /* ---------- CREATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
  @Field(() => Date)
    createdAt: CardPrimitive['createdAt']

  /* ---------- DELETED ---------- */
  @ApiProperty({
    example: true,
    type: Boolean
  })
  @IsBoolean()
  @Field(() => Boolean)
    deleted: CardPrimitive['deleted']

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
