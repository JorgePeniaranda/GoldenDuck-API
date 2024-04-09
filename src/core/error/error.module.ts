import { Module } from '@nestjs/common'
import { PrismaService } from '../../services/prisma.service'
import { ErrorRepositoryPrismaMySQL } from './data-access/error-prisma-mysql.repository'
import { ErrorService } from './domain/service/error.service'
import { ErrorController } from './entry-points/error.controller'

@Module({
  controllers: [ErrorController],
  providers: [
    ErrorService,
    {
      provide: 'ErrorRepository',
      useClass: ErrorRepositoryPrismaMySQL
    },
    PrismaService
  ]
})
export class ErrorModule {}
