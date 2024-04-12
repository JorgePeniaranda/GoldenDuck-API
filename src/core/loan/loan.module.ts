import { Module } from '@nestjs/common'
import { PrismaService } from '../../services/prisma.service'
import { AccountModule } from '../account/account.module'
import { LoanRepositoryPrismaMySQL } from './data-access/loan-prisma-mysql.repository'
import { ReadLoanService } from './domain/service/read-loan.service'
import { WriteLoanService } from './domain/service/write-loan.service'
import { LoanController } from './entry-points/loan.controller'

@Module({
  imports: [AccountModule],
  controllers: [LoanController],
  providers: [
    WriteLoanService,
    ReadLoanService,
    {
      provide: 'LoanRepository',
      useClass: LoanRepositoryPrismaMySQL
    },
    PrismaService
  ],
  exports: [ReadLoanService]
})
export class LoanModule {}
