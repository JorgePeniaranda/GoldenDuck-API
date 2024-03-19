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

  constructor (session: SessionPrimitiveEntity) {
    this.id = new ID(session.id, `${ObjectName} -> ID`)
    this.idUser = new ID(session.idUser, `${ObjectName} -> IDUser`)
    this.ip = typeof session.ip !== 'string' ? null : new ValidString(session.ip, `${ObjectName} -> IP`)
    this.userAgent = typeof session.userAgent !== 'string'
      ? null
      : new ValidString(
        session.userAgent,
      `${ObjectName} -> UserAgent`
      )
    this.createdAt = new PastDate(session.createdAt, `${ObjectName} -> Date`)
  }

  public toJSON (): SessionPrimitiveEntity {
    return {
      id: this.id.value,
      idUser: this.idUser.value,
      ip: this.ip?.value,
      userAgent: this.userAgent?.value,
      createdAt: this.createdAt.value
    }
  }
}
