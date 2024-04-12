import { Module } from '@nestjs/common'
import { PrismaService } from '../../services/prisma.service'
import { AccountModule } from '../account/account.module'
import { InvestmentRepositoryPrismaMySQL } from './data-access/investment-prisma-mysql.repository'
import { ReadInvestmentService } from './domain/service/read-investment.service'
import { WriteInvestmentService } from './domain/service/write-investment.service'
import { InvestmentController } from './entry-points/investment.controller'

@Module({
  imports: [AccountModule],
  controllers: [InvestmentController],
  providers: [
    WriteInvestmentService,
    ReadInvestmentService,
    {
      provide: 'InvestmentRepository',
      useClass: InvestmentRepositoryPrismaMySQL
    },
    PrismaService
  ],
  exports: [ReadInvestmentService]
})
export class InvestmentModule {}
