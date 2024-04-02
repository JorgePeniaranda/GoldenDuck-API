import { Module } from '@nestjs/common'
import { PrismaService } from '../shared/prisma.repository'
import { AccountRepositoryPrismaMySQL } from './data-access/account-prisma-mysql.repository'
import { AccountService } from './domain/service/account.service'
import { AccountController } from './entry-points/account.controller'

@Module({
  controllers: [AccountController],
  providers: [AccountService, {
    provide: 'AccountRepository',
    useClass: AccountRepositoryPrismaMySQL
  }, PrismaService]
})
export class AccountModule {}