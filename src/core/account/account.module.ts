import { Module } from '@nestjs/common'
import { PrismaService } from '../../services/prisma.service'
import { UserModule } from '../user/user.module'
import { AccountRepositoryPrismaMySQL } from './data-access/account-prisma-mysql.repository'
import { ReadAccountService } from './domain/service/read-account.service'
import { WriteAccountService } from './domain/service/write-account.service'
import { AccountController } from './entry-points/account.controller'

@Module({
  imports: [
    UserModule
  ],
  controllers: [AccountController],
  providers: [
    WriteAccountService,
    ReadAccountService,
    {
      provide: 'AccountRepository',
      useClass: AccountRepositoryPrismaMySQL
    },
    PrismaService
  ],
  exports: [
    ReadAccountService
  ]
})
export class AccountModule {}
