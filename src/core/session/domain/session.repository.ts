import { type CreateSessionDTO } from './dto/create-session'
import { type Session } from './session.entity'
import { type SessionPrimitive } from './session.primitive'

export interface SessionRepository {
  create: (data: CreateSessionDTO) => Promise<Session>
  findAll: () => Promise<Session[] | null>
  findOne: (id: SessionPrimitive['id']) => Promise<Session | null>
  delete: (id: SessionPrimitive['id']) => Promise<void>
}
