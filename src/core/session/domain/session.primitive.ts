import { type Session } from '@prisma/client'

export interface SessionPrimitive {
  id: Session['id']
  idUser: Session['idUser']
  ip: Session['ip']
  userAgent: Session['userAgent']
  location: Session['location']
  deviceType: Session['deviceType']
  token: Session['token']
  active: Session['active']
  logoutAt: Session['logoutAt']
  createdAt: Session['createdAt']
}
