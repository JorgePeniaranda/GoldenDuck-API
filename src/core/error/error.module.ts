import { Module } from '@nestjs/common'
import { PrismaService } from '../../services/prisma.service'
import { ErrorRepositoryPrismaMySQL } from './data-access/error-prisma-mysql.repository'
import { ReadErrorService } from './domain/service/read-error.service'
import { WriteErrorService } from './domain/service/write-error.service'
import { ErrorController } from './entry-points/error.controller'

@Module({
  controllers: [ErrorController],
  providers: [
    WriteErrorService,
    ReadErrorService,
    {
      provide: 'ErrorRepository',
      useClass: ErrorRepositoryPrismaMySQL
    },
    PrismaService
  ],
  exports: [ReadErrorService]
})
export class ErrorModule {}
