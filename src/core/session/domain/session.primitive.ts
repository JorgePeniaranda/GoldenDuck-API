import { type Session } from '@prisma/client'

export interface SessionPrimitive {
  readonly id: Session['id']
  readonly idUser: Session['idUser']
  readonly ip: Session['ip']
  readonly userAgent: Session['userAgent']
  readonly location: Session['location']
  readonly deviceType: Session['deviceType']
  readonly token: Session['token']
  active: Session['active']
  logoutAt: Session['logoutAt']
  readonly createdAt: Session['createdAt']
}
