import { type SessionPrimitive } from './session.primitive'

export class Session implements SessionPrimitive {
  id: SessionPrimitive['id']
  idUser: SessionPrimitive['idUser']
  ip: SessionPrimitive['ip']
  userAgent: SessionPrimitive['userAgent']
  location: SessionPrimitive['location']
  deviceType: SessionPrimitive['deviceType']
  token: SessionPrimitive['token']
  active: SessionPrimitive['active']
  logoutAt: SessionPrimitive['logoutAt']
  createdAt: SessionPrimitive['createdAt']

  constructor (transaction: SessionPrimitive) {
    this.id = transaction.id
    this.idUser = transaction.idUser
    this.ip = transaction.ip
    this.userAgent = transaction.userAgent
    this.location = transaction.location
    this.deviceType = transaction.deviceType
    this.token = transaction.token
    this.active = transaction.active
    this.logoutAt = transaction.logoutAt
    this.createdAt = transaction.createdAt
  }

  public static create ({
    idUser,
    ip,
    userAgent,
    location,
    deviceType,
    token
  }: {
    idUser: SessionPrimitive['idUser']
    ip: SessionPrimitive['ip']
    userAgent: SessionPrimitive['userAgent']
    location: SessionPrimitive['location']
    deviceType: SessionPrimitive['deviceType']
    token: SessionPrimitive['token']
  }): Session {
    return new Session({
      id: 0,
      idUser,
      ip,
      userAgent,
      location,
      deviceType,
      token,
      active: true,
      logoutAt: null,
      createdAt: new Date()
    })
  }

  public toJSON (): SessionPrimitive {
    return {
      id: this.id,
      idUser: this.idUser,
      ip: this.ip,
      userAgent: this.userAgent,
      location: this.location,
      deviceType: this.deviceType,
      token: this.token,
      active: this.active,
      logoutAt: this.logoutAt,
      createdAt: this.createdAt
    }
  }
}
