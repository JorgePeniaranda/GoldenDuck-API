import { Module } from '@nestjs/common'
import { PrismaService } from '../../services/prisma.service'
import { SessionRepositoryPrismaMySQL } from './data-access/session-prisma-mysql.repository'
import { SessionService } from './domain/service/session.service'
import { SessionController } from './entry-points/session.controller'

@Module({
  controllers: [SessionController],
  providers: [
    SessionService,
    {
      provide: 'SessionRepository',
      useClass: SessionRepositoryPrismaMySQL
    },
    PrismaService
  ]
})
export class SessionModule {}
