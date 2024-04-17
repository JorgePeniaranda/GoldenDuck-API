import { Field, ID, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxDate,
  MaxLength
} from 'class-validator'
import { type SessionPrimitive } from './session.primitive'

@InputType()
export class SessionDTO implements SessionPrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
  @Field(() => ID)
    id: SessionPrimitive['id']

  /* ---------- ID USER ---------- */
  @ApiProperty({
    example: 2,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
  @Field(() => Number)
    idUser: SessionPrimitive['idUser']

  /* ---------- IP ---------- */
  @ApiProperty({
    example: '127.0.0.1',
    type: String
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  @Field(() => String)
    ip: SessionPrimitive['ip']

  /* ---------- USER AGENT ---------- */
  @ApiProperty({
    example: 'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.3;...',
    type: String
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  @Field(() => String)
    userAgent: SessionPrimitive['userAgent']

  /* ---------- LOCATION ---------- */
  @ApiProperty({
    example: 'Northwest',
    type: String
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  @Field(() => String)
    location: SessionPrimitive['location']

  /* ---------- DEVICETYPE ---------- */
  @ApiProperty({
    example: 'Laptop',
    type: String
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  @Field(() => String)
    deviceType: SessionPrimitive['deviceType']

  /* ---------- TOKEN ---------- */
  @ApiProperty({
    example: '74932bc2-cec9-4f34-9b94-ef808a58cfbf',
    type: String
  })
  @IsString()
  @MaxLength(5000)
  @Field(() => String)
    token: SessionPrimitive['token']

  /* ---------- LOGOUT AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
  @Field(() => Date)
    logoutAt: SessionPrimitive['logoutAt']

  /* ---------- CREATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
  @Field(() => Date)
    createdAt: SessionPrimitive['createdAt']

  /* ---------- ACTIVED ---------- */
  @ApiProperty({
    example: true,
    type: Boolean
  })
  @IsBoolean()
  @Field(() => Boolean)
    active: SessionPrimitive['active']
}
