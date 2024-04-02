import { Module } from '@nestjs/common'
import { AccountModule } from './core/account/account.module'
import { AuthModule } from './core/authentication/auth.module'
import { UserModule } from './core/user/user.module'

@Module({
  imports: [UserModule, AccountModule, AuthModule]
})
export class AppModule {}
