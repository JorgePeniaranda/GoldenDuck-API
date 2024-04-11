import { Module } from '@nestjs/common'
import { PrismaService } from '../../services/prisma.service'
import { UserModule } from '../user/user.module'
import { AccountRepositoryPrismaMySQL } from './data-access/account-prisma-mysql.repository'
import { AccountService } from './domain/service/account.service'
import { AccountController } from './entry-points/account.controller'

@Module({
  imports: [
    UserModule
  ],
  controllers: [AccountController],
  providers: [
    AccountService,
    {
      provide: 'AccountRepository',
      useClass: AccountRepositoryPrismaMySQL
    },
    PrismaService
  ]
})
export class AccountModule {}
