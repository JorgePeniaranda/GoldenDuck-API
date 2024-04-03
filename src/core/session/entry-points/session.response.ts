import { ApiProperty } from '@nestjs/swagger'
import { type SessionPrimitive } from '../domain/session.primitive'

export class SessionResponse implements SessionPrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    id: SessionPrimitive['id']

  /* ---------- ID USER ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    idUser: SessionPrimitive['idUser']

  /* ---------- IP ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    ip: SessionPrimitive['ip']

  /* ---------- USER AGENT ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    userAgent: SessionPrimitive['userAgent']

  /* ---------- LOCATION ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    location: SessionPrimitive['location']

  /* ---------- DEVICETYPE ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    deviceType: SessionPrimitive['deviceType']

  /* ---------- TOKEN ---------- */
  @ApiProperty({
    example: 1,
    type: Number
  })
    token: SessionPrimitive['token']

  /* ---------- LOGOUT AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
    logoutAt: SessionPrimitive['logoutAt']

  /* ---------- CREATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date
  })
    createdAt: SessionPrimitive['createdAt']

  /* ---------- ACTIVED ---------- */
  @ApiProperty({
    example: true,
    type: Boolean
  })
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
