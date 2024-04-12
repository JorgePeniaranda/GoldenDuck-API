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

  public async findAll ({ idUser }: { idUser: SessionPrimitive['idUser'] }): Promise<Session[]> {
    return await this.sessionRepository.findAll({ idUser })
  }

  public async findOne ({ idUser, index }: { idUser: SessionPrimitive['idUser'], index: number }): Promise<Session | null> {
    return await this.sessionRepository.findOne({ idUser, index })
  }

  public async findByID (id: SessionPrimitive['id']): Promise<Session | null> {
    return await this.sessionRepository.findByID({ id })
  }
}
