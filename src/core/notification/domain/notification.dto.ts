import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDate, IsNumber, IsPositive, IsString, MaxDate } from 'class-validator'
import { type NotificationPrimitive } from './notification.primitive'

export class NotificationDTO implements NotificationPrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    id: NotificationPrimitive['id']

  /* ---------- ID USER ---------- */
  @ApiProperty({
    example: 2,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    idUser: NotificationPrimitive['idUser']

  /* ---------- MESSAGE ---------- */
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: Number
  })
  @IsString()
    message: NotificationPrimitive['message']

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

  /* ---------- READ ---------- */
  @ApiProperty({
    example: true,
    type: Boolean
  })
  @IsBoolean()
    read: boolean

  constructor (transaction: NotificationPrimitive) {
    this.id = transaction.id
    this.idUser = transaction.idUser
    this.message = transaction.message
    this.updatedAt = transaction.updatedAt
    this.createdAt = transaction.createdAt
    this.read = transaction.read
  }
}
