import { ID } from '@/valueObjects/number/ID/ID.value'
import {
  type SessionPrimitiveEntity,
  type SessionEntity
} from './session.entity'
import { PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { ValidString } from '@/valueObjects/string/string/String.value'

const ObjectName = 'Session'

export class Session implements SessionEntity {
  readonly id: SessionEntity['id']
  readonly idUser: SessionEntity['idUser']
  readonly ip: SessionEntity['ip']
  readonly userAgent: SessionEntity['userAgent']
  readonly createdAt: SessionEntity['createdAt']

  constructor (session: SessionEntity) {
    this.id = session.id
    this.idUser = session.idUser
    this.ip = session.ip
    this.userAgent = session.userAgent
    this.createdAt = session.createdAt
  }

  public create (session: SessionPrimitiveEntity): Session {
    return new Session({
      id: new ID(session.id, `${ObjectName} -> ID`),
      idUser: new ID(session.idUser, `${ObjectName} -> IDUser`),
      ip: new ValidString(session.ip, `${ObjectName} -> IP`),
      userAgent: new ValidString(session.userAgent, `${ObjectName} -> UserAgent`),
      createdAt: new PastDate(session.createdAt, `${ObjectName} -> Date`)
    })
  }

  public toJSON (): SessionPrimitiveEntity {
    return {
      id: this.id.value,
      idUser: this.idUser.value,
      ip: this.ip.value,
      userAgent: this.userAgent.value,
      createdAt: this.createdAt.value
    }
  }
}
