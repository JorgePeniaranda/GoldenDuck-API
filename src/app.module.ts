import { Module } from '@nestjs/common'
import { AccountModule } from './core/account/account.module'
import { AuthModule } from './core/authentication/auth.module'
import { TransactionModule } from './core/transaction/account.module'
import { UserModule } from './core/user/user.module'

@Module({
  imports: [AuthModule, UserModule, AccountModule, TransactionModule]
})
export class AppModule {}
