import { type SessionEntity } from './session.entity'

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

  public toJSON (): SessionEntity {
    return {
      id: this.id,
      idUser: this.idUser,
      ip: this.ip,
      userAgent: this.userAgent,
      date: this.date
    }
  }
}
