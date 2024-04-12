import { SessionErrorsMessages } from '@/messages/error/session'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { type CreateSessionDTO } from '../dto/create-session'
import { Session } from '../session.entity'
import { type SessionPrimitive } from '../session.primitive'
import { SessionRepository } from '../session.repository'

@Injectable()
export class SessionService {
  constructor (
    @Inject('SessionRepository')
    private readonly sessionRepository: SessionRepository
  ) {}

  public async create (data: CreateSessionDTO): Promise<Session> {
    const session = Session.create(data)

    return await this.sessionRepository.create(session)

    // TO-DO: send notification to account device and account email
  }

  public async findAll ({ idUser }: { idUser: SessionPrimitive['idUser'] }): Promise<Session[]> {
    return await this.sessionRepository.findAll({ idUser })
  }

  public async findOne ({ idUser, index }: { idUser: SessionPrimitive['idUser'], index: number }): Promise<Session | null> {
    return await this.sessionRepository.findOne({ idUser, index })
  }

  public async findByID (id: SessionPrimitive['id']): Promise<Session | null> {
    return await this.sessionRepository.findByID({ id })
  }

  public async delete ({ idUser, index }: { idUser: SessionPrimitive['idUser'], index: number }): Promise<void> {
    const session = await this.findOne({ idUser, index })

    if (session === null) {
      throw new NotFoundException(SessionErrorsMessages.NotFound)
    }

    await this.sessionRepository.delete(session)
  }
}
