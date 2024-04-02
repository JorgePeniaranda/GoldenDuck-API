import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDate, IsNumber, IsPositive, IsString, MaxDate } from 'class-validator'
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
    example: 1,
    type: Number
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsPositive()
    idUser: SessionPrimitive['idUser']

  /* ---------- IP ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsString()
    ip: SessionPrimitive['ip']

  /* ---------- USER AGENT ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsString()
    userAgent: SessionPrimitive['userAgent']

  /* ---------- LOCATION ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsString()
    location: SessionPrimitive['location']

  /* ---------- DEVICETYPE ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
  @IsString()
    deviceType: SessionPrimitive['deviceType']

  /* ---------- TOKEN ---------- */
  @ApiProperty({
    example: 1,
    type: Number
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
