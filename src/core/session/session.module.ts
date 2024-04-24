import { EventsMap } from '@/constants/events'
import { Module } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { PrismaService } from '../../services/prisma.service'
import { type SessionDataPrimitive } from '../auth/domain/primitive/session-data.primitive'
import { UserModule } from '../user/user.module'
import { SessionRepositoryPrismaMySQL } from './data-access/session-prisma-mysql.repository'
import { ReadSessionService } from './domain/service/read-session.service'
import { WriteSessionService } from './domain/service/write-session.service'
import { SessionController } from './entry-points/session.controller'
import { SessionResolver } from './entry-points/session.resolver'

@Module({
  imports: [UserModule],
  controllers: [SessionController],
  providers: [
    WriteSessionService,
    ReadSessionService,
    SessionResolver,
    {
      provide: 'SessionRepository',
      useClass: SessionRepositoryPrismaMySQL
    },
    PrismaService
  ],
  exports: [ReadSessionService]
})
export class SessionModule {
  constructor (private readonly eventEmitter: EventEmitter2) {
    // #region EVENTS SUBSCRIPTION
    /* ------------------------- USER EVENTS ------------------------- */

    this.eventEmitter.on(EventsMap.USER_LOGGED_IN, ({ user, token }: SessionDataPrimitive) => {
      const params: Parameters<WriteSessionService['create']>[0] = {
        idUser: user.id,
        token
      }

      this.eventEmitter.emit(EventsMap.CREATE_SESSION, params)
    })

    this.eventEmitter.on(EventsMap.USER_LOGGED_OUT, ({ token }: SessionDataPrimitive) => {
      this.eventEmitter.emit(EventsMap.CLOSE_SESSION, { token })
    })
  }
}
