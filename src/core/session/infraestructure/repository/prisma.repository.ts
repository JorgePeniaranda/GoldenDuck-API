import { prisma } from '@/libs/prisma'
import { type SessionEntity } from '../../domain/session.entity'
import { type SessionRepository } from '../../domain/session.repository'
import { Session } from '../../domain/session.value'

export class PrismaRepository implements SessionRepository {
  public async registerSession ({
    idUser,
    ip,
    userAgent
  }: {
    idUser: SessionEntity['idUser']
    ip: SessionEntity['ip']
    userAgent: SessionEntity['userAgent']
  }): Promise<Session> {
    const createdSession = await prisma.session.create({
      data: {
        idUser: idUser?.value,
        ip: ip?.value,
        userAgent: userAgent?.value
      }
    })

    return new Session(createdSession)
  }

  public async getAllSession (): Promise<Session[]> {
    const categories = await prisma.session.findMany()

    return categories.map((session) => new Session(session))
  }

  public async findSession ({
    id
  }: {
    id?: SessionEntity['id']
  }): Promise<Session | null> {
    const session = await prisma.session.findUnique({
      where: {
        id: id?.value
      }
    })

    return session === null ? null : new Session(session)
  }
}
