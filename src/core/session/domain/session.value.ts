import { ID } from '@/valueObjects/number/ID/ID.value'
import {
  type SessionPrimitiveEntity,
  type SessionEntity
} from './session.entity'
import { PastDate } from '@/valueObjects/date/PastDate/PastDate.value'

export class Session implements SessionEntity {
  readonly id: SessionEntity['id']
  readonly idUser: SessionEntity['idUser']
  readonly ip: SessionEntity['ip']
  readonly userAgent: SessionEntity['userAgent']
  readonly date: SessionEntity['date']

  constructor (session: SessionEntity) {
    this.id = session.id
    this.idUser = session.idUser
    this.ip = session.ip
    this.userAgent = session.userAgent
    this.date = session.date
  }

  public create (session: SessionPrimitiveEntity): Session {
    return new Session({
      id: new ID(session.id),
      idUser: new ID(session.idUser),
      ip: session.ip,
      userAgent: session.userAgent,
      date: new PastDate(session.date)
    })
  }

  public toJSON (): SessionPrimitiveEntity {
    return {
      id: this.id.value(),
      idUser: this.idUser.value(),
      ip: this.ip,
      userAgent: this.userAgent,
      date: this.date.value()
    }
  }
}
