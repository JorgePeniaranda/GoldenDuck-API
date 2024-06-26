import { type SessionData } from '@/core/auth/domain/session-data.entity'
import { Inject, Injectable } from '@nestjs/common'
import { type Session } from '../session.entity'
import { type SessionPrimitive } from '../session.primitive'
import { SessionRepository } from '../session.repository'

@Injectable()
export class ReadSessionService {
  constructor (
    @Inject('SessionRepository')
    private readonly sessionRepository: SessionRepository
  ) {}

  /* ---------- findAll ---------- */ // MARK: findAll
  public async findAll ({ idUser }: { idUser: SessionPrimitive['idUser'] }): Promise<Session[]> {
    return await this.sessionRepository.findAll({ idUser })
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  public async findOne ({
    idUser,
    index
  }: {
    idUser: SessionPrimitive['idUser']
    index: number
  }): Promise<Session | null> {
    return await this.sessionRepository.findOne({ idUser, index })
  }

  /* ---------- findByID ---------- */ // MARK: findByID
  public async findByID (id: SessionPrimitive['id']): Promise<Session | null> {
    return await this.sessionRepository.findByID({ id })
  }

  /* ---------- findWithSessionData ---------- */ // MARK: findWithSessionData
  public async findWithSessionData (data: SessionData): Promise<Session | null> {
    const session = await this.sessionRepository.findByToken({ token: data.token })

    return session
  }
}
