import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxDate
} from 'class-validator'
import { type SessionPrimitive } from './session.primitive'

export class SessionDTO implements SessionPrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    id: SessionPrimitive['id']

  /* ---------- ID USER ---------- */
  @ApiProperty({
    example: 2,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    idUser: SessionPrimitive['idUser']

  /* ---------- IP ---------- */
  @ApiProperty({
    example: '127.0.0.1',
    type: String
  })
  @IsString()
  @IsOptional()
    ip: SessionPrimitive['ip']

  /* ---------- USER AGENT ---------- */
  @ApiProperty({
    example: 'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.3;...',
    type: String
  })
  @IsString()
  @IsOptional()
    userAgent: SessionPrimitive['userAgent']

  /* ---------- LOCATION ---------- */
  @ApiProperty({
    example: 'Northwest',
    type: String
  })
  @IsString()
  @IsOptional()
    location: SessionPrimitive['location']

  /* ---------- DEVICETYPE ---------- */
  @ApiProperty({
    example: 'Laptop',
    type: String
  })
  @IsString()
  @IsOptional()
    deviceType: SessionPrimitive['deviceType']

  /* ---------- TOKEN ---------- */
  @ApiProperty({
    example: '74932bc2-cec9-4f34-9b94-ef808a58cfbf',
    type: String
  })
  @IsString()
    token: SessionPrimitive['token']

  /* ---------- LOGOUT AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
    logoutAt: SessionPrimitive['logoutAt']

  /* ---------- CREATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @IsDate()
  @MaxDate(new Date())
    createdAt: SessionPrimitive['createdAt']

  /* ---------- ACTIVED ---------- */
  @ApiProperty({
    example: true,
    type: Boolean
  })
  @IsString()
  @IsBoolean()
    active: SessionPrimitive['active']

  constructor (transaction: SessionPrimitive) {
    this.id = transaction.id
    this.idUser = transaction.idUser
    this.ip = transaction.ip
    this.userAgent = transaction.userAgent
    this.location = transaction.location
    this.deviceType = transaction.deviceType
    this.token = transaction.token
    this.logoutAt = transaction.logoutAt
    this.createdAt = transaction.createdAt
    this.active = transaction.active
  }
}
