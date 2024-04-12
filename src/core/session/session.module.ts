import { Module } from '@nestjs/common'
import { PrismaService } from '../../services/prisma.service'
import { SessionRepositoryPrismaMySQL } from './data-access/session-prisma-mysql.repository'
import { ReadSessionService } from './domain/service/read-session.service'
import { WriteSessionService } from './domain/service/write-session.service'
import { SessionController } from './entry-points/session.controller'

@Module({
  controllers: [SessionController],
  providers: [
    WriteSessionService,
    ReadSessionService,
    {
      provide: 'SessionRepository',
      useClass: SessionRepositoryPrismaMySQL
    },
    PrismaService
  ],
  exports: [ReadSessionService]
})
export class SessionModule {}
