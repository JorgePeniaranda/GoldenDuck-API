import { Module } from '@nestjs/common'
import { PrismaService } from '../../services/prisma.service'
import { AccountModule } from '../account/account.module'
import { TransactionRepositoryPrismaMySQL } from './data-access/transaction-prisma-mysql.repository'
import { TransactionService } from './domain/service/transaction.service'
import { TransactionController } from './entry-points/transaction.controller'

@Module({
  imports: [AccountModule],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    {
      provide: 'TransactionRepository',
      useClass: TransactionRepositoryPrismaMySQL
    },
    PrismaService
  ]
})
export class TransactionModule {}
