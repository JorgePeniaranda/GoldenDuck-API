import { type SessionEntity } from '../domain/session.entity'
import { type SessionRepository } from '../domain/session.repository'
import { type Session } from '../domain/session.value'

export class SessionUseCase {
  constructor (private readonly sessionRepository: SessionRepository) {}

  public async registerSession ({
    idUser,
    ip,
    userAgent
  }: {
    idUser: SessionEntity['idUser']
    ip: SessionEntity['ip']
    userAgent: SessionEntity['userAgent']
  }): Promise<Session> {
    const createdSession = await this.sessionRepository.registerSession({
      idUser,
      ip,
      userAgent
    })

    return createdSession
  }

  public async getAllSession (
    idUser: SessionEntity['idUser']
  ): Promise<Session[] | null> {
    const AllCategories = await this.sessionRepository.getAllSession(idUser)

    return AllCategories
  }

  public async findSession ({
    id
  }: {
    id: SessionEntity['id']
  }): Promise<Session | null> {
    const session = await this.sessionRepository.findSession({ id })

    return session
  }
}
