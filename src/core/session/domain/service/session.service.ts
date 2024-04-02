import { Inject, Injectable } from '@nestjs/common'
import { type CreateSessionDTO } from '../dto/create-session'
import { type Session } from '../session.entity'
import { type SessionPrimitive } from '../session.primitive'
import { SessionRepository } from '../session.repository'

@Injectable()
export class SessionService {
  constructor (
    @Inject('SessionRepository')
    private readonly sessionRepository: SessionRepository
  ) {}

  public async create (data: CreateSessionDTO): Promise<Session> {
    return await this.sessionRepository.create(data)
  }

  public async getAll (): Promise<Session[] | null> {
    return await this.sessionRepository.getAll()
  }

  public async find (id: SessionPrimitive['id']): Promise<Session | null> {
    return await this.sessionRepository.find(id)
  }

  public async delete (id: SessionPrimitive['id']): Promise<void> {
    await this.sessionRepository.delete(id)
  }
}
