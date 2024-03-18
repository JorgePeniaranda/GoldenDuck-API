import { type SessionEntity } from './session.entity'
import { type Session } from './session.value'

export interface SessionRepository {
  registerSession: (session: SessionEntity) => Promise<Session>
  getAllSession: () => Promise<Session[]>
  findSession: ({
    id
  }: {
    id?: SessionEntity['id']
  }) => Promise<Session | null>
}
