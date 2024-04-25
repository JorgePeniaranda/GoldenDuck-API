import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { GraphQLModule } from '@nestjs/graphql'
import { ScheduleModule } from '@nestjs/schedule'
import { join } from 'path'
import { AccountModule } from './core/account/account.module'
import { AuthModule } from './core/auth/auth.module'
import { CardModule } from './core/card/card.module'
import { CategoryModule } from './core/category/category.module'
import { ErrorModule } from './core/error/error.module'
import { InvestmentModule } from './core/investment/investment.module'
import { LoanModule } from './core/loan/loan.module'
import { MessageModule } from './core/message/messages.module'
import { NotificationModule } from './core/notification/notification.module'
import { ProfilePictureModule } from './core/profile-picture/profile-picture.module'
import { SessionModule } from './core/session/session.module'
import { TransactionModule } from './core/transaction/transactions.module'
import { UserModule } from './core/user/user.module'
import { CodeModule } from './core/code/code.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      playground: true
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    AccountModule,
    CardModule,
    CategoryModule,
    CodeModule,
    ErrorModule,
    InvestmentModule,
    LoanModule,
    MessageModule,
    NotificationModule,
    ProfilePictureModule,
    SessionModule,
    TransactionModule
  ]
})
export class AppModule {}
