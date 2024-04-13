import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ScheduleModule } from '@nestjs/schedule'
import { AccountModule } from './core/account/account.module'
import { AuthModule } from './core/auth/auth.module'
import { CardModule } from './core/card/card.module'
import { CategoryModule } from './core/category/category.module'
import { ErrorModule } from './core/error/error.module'
import { InvestmentModule } from './core/investment/investment.module'
import { LoanModule } from './core/loan/loan.module'
import { MessageModule } from './core/message/messages.module'
import { NotificationModule } from './core/notification/notification.module'
import { SessionModule } from './core/session/session.module'
import { TransactionModule } from './core/transaction/transactions.module'
import { UserModule } from './core/user/user.module'

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    SessionModule,
    AccountModule,
    CardModule,
    MessageModule,
    NotificationModule,
    TransactionModule,
    LoanModule,
    InvestmentModule,
    CategoryModule,
    ErrorModule
  ]
})
export class AppModule {}
