import { faker } from '@faker-js/faker'
import { type Notification, type PrismaClient, type Session } from '@prisma/client'
import { PrismaParams, type PrismaWithoutID } from '../PrismaParams'

export class PrismaSession implements PrismaWithoutID<Session> {
  readonly idUser: Session['idUser']
  readonly ip: Session['ip']
  readonly userAgent: Session['userAgent']
  readonly location: Session['location']
  readonly deviceType: Session['deviceType']
  readonly token: Session['token']
  readonly active: Session['active']
  readonly logoutAt: Session['logoutAt']
  readonly expiredAt: Session['expiredAt']
  readonly createdAt: Session['createdAt']

  constructor(session: PrismaWithoutID<Session>) {
    this.idUser = session.idUser
    this.ip = session.ip
    this.userAgent = session.userAgent
    this.location = session.location
    this.deviceType = session.deviceType
    this.token = session.token
    this.active = session.active
    this.logoutAt = session.logoutAt
    this.expiredAt = session.expiredAt
    this.createdAt = session.createdAt
  }

  public static generate({ idUser }: { idUser: Session['idUser'] }): PrismaSession {
    const createdAt = faker.date.past()
    const expiredAt = faker.date.future()
    const active = faker.datatype.boolean({ probability: PrismaParams.SESSION_ACTIVE_PROBABILITY })
    const logoutAt = active
      ? faker.date.between({
          from: createdAt,
          to: new Date()
        })
      : createdAt

    return new PrismaSession({
      idUser,
      ip: faker.internet.ipv4(),
      userAgent: faker.internet.userAgent(),
      location: faker.location.nearbyGPSCoordinate().toLocaleString(),
      deviceType: faker.commerce.product(),
      token: faker.string.uuid(),
      active,
      logoutAt,
      expiredAt,
      createdAt
    })
  }

  public static async insert({
    prisma,
    idUser,
    amount
  }: {
    prisma: PrismaClient
    idUser: Notification['idUser']
    amount: number
  }): Promise<PrismaSession[]> {
    const sessions = [] as PrismaSession[]
    for (let i = 0; i < amount; i++) {
      sessions.push(PrismaSession.generate({ idUser }))
    }

    await prisma.session.createMany({
      data: sessions
    })

    return sessions
  }
}
