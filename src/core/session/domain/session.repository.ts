import { type Session } from './session.entity'
import { type SessionPrimitive } from './session.primitive'

export interface SessionRepository {
  create: (data: Session) => Promise<Session>
  findAll: ({ idUser }: { idUser: SessionPrimitive['idUser'] }) => Promise<Session[]>
  findOne: ({
    idUser,
    index
  }: {
    idUser: SessionPrimitive['idUser']
    index: number
  }) => Promise<Session | null>
  findByID: ({ id }: { id: SessionPrimitive['id'] }) => Promise<Session | null>
  delete: (data: Session) => Promise<void>
}
