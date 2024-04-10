import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { type CreateSessionDTO } from '../domain/dto/create-session'
import { Session } from '../domain/session.entity'
import { type SessionPrimitive } from '../domain/session.primitive'
import { type SessionRepository } from '../domain/session.repository'

@Injectable()
export class SessionRepositoryPrismaMySQL implements SessionRepository {
  constructor (private readonly prisma: PrismaService) {}

  public async create (data: CreateSessionDTO): Promise<Session> {
    const newSession = await this.prisma.session.create({
      data
    })

    return new Session(newSession)
  }

  public async findAll (): Promise<Session[] | null> {
    const sessions = await this.prisma.session.findMany()

    return sessions.map(session => new Session(session))
  }

  public async findOne (id: SessionPrimitive['id']): Promise<Session | null> {
    const session = await this.prisma.session.findUnique({
      where: {
        id
      }
    })

    return session !== null ? new Session(session) : null
  }

  public async delete (id: SessionPrimitive['id']): Promise<void> {
    await this.prisma.session.delete({
      where: {
        id
      }
    })
  }
}
