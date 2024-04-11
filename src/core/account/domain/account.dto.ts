import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsPositive,
  IsString,
  MaxDate
} from 'class-validator'
import { type AccountPrimitive } from './account.primitive'

export class AccountDTO implements AccountPrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    id: AccountPrimitive['id']

  /* ---------- NAME ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber()
  @IsPositive()
    idUser: AccountPrimitive['idUser']

  /* ---------- BALANCE ---------- */
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    balance: AccountPrimitive['balance']

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

  constructor (account: AccountPrimitive) {
    this.id = account.id
    this.idUser = account.idUser
    this.balance = account.balance
    this.updatedAt = account.updatedAt
    this.createdAt = account.createdAt
    this.deleted = account.deleted
  }
}
