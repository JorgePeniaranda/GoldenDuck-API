import { Module } from '@nestjs/common'
import { PrismaService } from '../../services/prisma.service'
import { LoanRepositoryPrismaMySQL } from './data-access/loan-prisma-mysql.repository'
import { LoanService } from './domain/service/loan.service'
import { LoanController } from './entry-points/loan.controller'

@Module({
  controllers: [LoanController],
  providers: [
    LoanService,
    {
      provide: 'LoanRepository',
      useClass: LoanRepositoryPrismaMySQL
    },
    PrismaService
  ]
})
export class LoanModule {}
