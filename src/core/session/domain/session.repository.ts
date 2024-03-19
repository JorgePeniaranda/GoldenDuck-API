import { type SessionEntity } from './session.entity'
import { type Session } from './session.value'

export interface SessionRepository {
  registerSession: ({
    idUser,
    ip,
    userAgent
  }: {
    idUser: SessionEntity['idUser']
    ip: SessionEntity['ip']
    userAgent: SessionEntity['userAgent']
  }) => Promise<Session>
  getAllSession: (idUser: SessionEntity['idUser']) => Promise<Session[]>
  findSession: ({ id }: { id?: SessionEntity['id'] }) => Promise<Session | null>
}
