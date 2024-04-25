import { EntitiesName } from '@/constants/entities'
import { EventsMap } from '@/constants/events'
import { Messages } from '@/messages'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { type CreateSessionDTO } from '../dto/create-session'
import { Session } from '../session.entity'
import { type SessionPrimitive } from '../session.primitive'
import { SessionRepository } from '../session.repository'
import { SessionData } from '@/core/auth/domain/session-data.entity'

@Injectable()
export class WriteSessionService {
  constructor (
    @Inject('SessionRepository')
    private readonly sessionRepository: SessionRepository,
    private readonly eventEmitter: EventEmitter2
  ) {}

  /* ---------- create ---------- */ // MARK: create
  @OnEvent(EventsMap.CREATE_SESSION)
  public async create (data: CreateSessionDTO): Promise<Session> {
    const session = Session.create(data)

    this.eventEmitter.emit(EventsMap.SESSION_CREATED, session.toJSON())

    return await this.sessionRepository.create(session)
  }

  /* ---------- closeSession ---------- */ // MARK: closeSession
  @OnEvent(EventsMap.CLOSE_SESSION)
  public async closeSession (data: SessionData): Promise<void> {
    const session = await this.sessionRepository.findByToken({ token: data.token })

    if (session === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.SESSION))
    }

    await this.sessionRepository.delete(session)
  }

  /* ---------- delete ---------- */ // MARK: delete
  public async delete ({
    idUser,
    index
  }: {
    idUser: SessionPrimitive['idUser']
    index: number
  }): Promise<void> {
    const session = await this.sessionRepository.findOne({ idUser, index })

    if (session === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.SESSION))
    }

    await this.sessionRepository.delete(session)
  }

  /* ---------- deleteAll ---------- */ // MARK: deleteAll
  public async deleteAll ({ idUser }: { idUser: SessionPrimitive['idUser'] }): Promise<void> {
    await this.sessionRepository.deleteAll({ idUser })
  }
}
