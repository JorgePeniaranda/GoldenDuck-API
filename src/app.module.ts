import { Module } from '@nestjs/common'
import { AccountModule } from './core/account/account.module'
import { AuthModule } from './core/authentication/auth.module'
import { InvestmentModule } from './core/investment/investment.module'
import { LoanModule } from './core/loan/loan.module'
import { MessageModule } from './core/message/messages.module'
import { NotificationModule } from './core/notification/notification.module'
import { TransactionModule } from './core/transaction/transactions.module'
import { UserModule } from './core/user/user.module'

@Module({
  imports: [AuthModule, UserModule, AccountModule, MessageModule, NotificationModule, TransactionModule, LoanModule, InvestmentModule]
})
export class AppModule {}
