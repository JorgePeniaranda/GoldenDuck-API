import { Module } from '@nestjs/common'
import { PrismaService } from '../../services/prisma.service'
import { AccountModule } from '../account/account.module'
import { TransactionRepositoryPrismaMySQL } from './data-access/transaction-prisma-mysql.repository'
import { ReadTransactionService } from './domain/service/read-transaction.service'
import { WriteTransactionService } from './domain/service/write-transaction.service'
import { TransactionController } from './entry-points/transaction.controller'
import { TransactionResolver } from './entry-points/transaction.resolver'

@Module({
  imports: [AccountModule],
  controllers: [TransactionController],
  providers: [
    WriteTransactionService,
    ReadTransactionService,
    TransactionResolver,
    {
      provide: 'TransactionRepository',
      useClass: TransactionRepositoryPrismaMySQL
    },
    PrismaService
  ],
  exports: [ReadTransactionService]
})
export class TransactionModule {}
