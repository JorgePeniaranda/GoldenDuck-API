import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { Session } from '../domain/session.entity'
import { type SessionPrimitive } from '../domain/session.primitive'
import { type SessionRepository } from '../domain/session.repository'

@Injectable()
export class SessionRepositoryPrismaMySQL implements SessionRepository {
  constructor (private readonly prisma: PrismaService) {}

  /* ---------- create ---------- */ // MARK: create
  public async create (data: Session): Promise<Session> {
    const newSession = await this.prisma.session.create({
      data: {
        ...data.toJSON(),
        id: undefined
      }
    })

    return new Session(newSession)
  }

  /* ---------- findAll ---------- */ // MARK: findAll
  public async findAll ({ idUser }: { idUser: SessionPrimitive['idUser'] }): Promise<Session[]> {
    const sessions = await this.prisma.session.findMany({
      where: {
        idUser
      }
    })

    return sessions.map(session => new Session(session))
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  public async findOne ({
    idUser,
    index
  }: {
    idUser: SessionPrimitive['idUser']
    index: number
  }): Promise<Session | null> {
    const session = await this.prisma.session.findMany({
      where: {
        idUser
      },
      skip: index,
      take: 1
    })

    return session[0] !== undefined ? new Session(session[0]) : null
  }

  /* ---------- findByID ---------- */ // MARK: findByID
  public async findByID ({ id }: { id: SessionPrimitive['id'] }): Promise<Session | null> {
    const session = await this.prisma.session.findUnique({
      where: {
        id
      }
    })

    return session !== null ? new Session(session) : null
  }

  /* ---------- delete ---------- */ // MARK: delete
  public async delete (data: Session): Promise<void> {
    await this.prisma.session.update({
      where: data.toJSON(),
      data: {
        active: false,
        logoutAt: new Date()
      }
    })
  }
}
