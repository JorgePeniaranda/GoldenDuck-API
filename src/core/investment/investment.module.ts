import { Module } from '@nestjs/common'
import { PrismaService } from '../shared/prisma.repository'
import { InvestmentRepositoryPrismaMySQL } from './data-access/investment-prisma-mysql.repository'
import { InvestmentService } from './domain/service/investment.service'
import { InvestmentController } from './entry-points/investment.controller'

@Module({
  controllers: [InvestmentController],
  providers: [InvestmentService, {
    provide: 'InvestmentRepository',
    useClass: InvestmentRepositoryPrismaMySQL
  }, PrismaService]
})
export class InvestmentModule {}
