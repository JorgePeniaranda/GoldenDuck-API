import { Field, ID, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDate, IsNumber, IsPositive, IsString, MaxDate } from 'class-validator'
import { type NotificationPrimitive } from './notification.primitive'

@InputType()
export class NotificationDTO implements NotificationPrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
  @Field(() => ID)
    id: NotificationPrimitive['id']

  /* ---------- ID USER ---------- */
  @ApiProperty({
    example: 2,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
  @Field(() => Number)
    idUser: NotificationPrimitive['idUser']

  /* ---------- MESSAGE ---------- */
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: Number
  })
  @IsString()
  @Field(() => String)
    message: NotificationPrimitive['message']

  /* ---------- UPDATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
  @Field(() => Date)
    updatedAt: NotificationPrimitive['updatedAt']

  /* ---------- CREATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
  @Field(() => Date)
    createdAt: NotificationPrimitive['createdAt']

  /* ---------- READ ---------- */
  @ApiProperty({
    example: true,
    type: Boolean
  })
  @IsBoolean()
  @Field(() => Boolean)
    read: NotificationPrimitive['read']
}
