import { EventsMap } from '@/constants/events'
import { type IChangeBalanceEvent, type ICreateAccountEvent, type ITransactionEvent } from '@/types/events'
import { Module } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { PrismaService } from '../../services/prisma.service'
import { UserModule } from '../user/user.module'
import { AccountRepositoryPrismaMySQL } from './data-access/account-prisma-mysql.repository'
import { ReadAccountService } from './domain/service/read-account.service'
import { WriteAccountService } from './domain/service/write-account.service'
import { AccountController } from './entry-points/account.controller'

@Module({
  imports: [UserModule],
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
  exports: [ReadAccountService]
})
export class AccountModule {
  constructor (private readonly eventEmitter: EventEmitter2) {
    /* @region EVENTS SUBSCRIPTION */

    this.eventEmitter.on(EventsMap.USER_CREATED, (data: ICreateAccountEvent) => {
      this.eventEmitter.emit(EventsMap.CREATE_ACCOUNT, data)
    })

    this.eventEmitter.on(EventsMap.TRANSACTION_CREATED, (data: ITransactionEvent) => {
      const SenderEventData: IChangeBalanceEvent = {
        id: data.idSender,
        amount: data.amount
      }

      const ReceiverEventData: IChangeBalanceEvent = {
        id: data.idReceiver,
        amount: data.amount
      }

      this.eventEmitter.emit(EventsMap.DECREMENT_BALANCE, SenderEventData)
      this.eventEmitter.emit(EventsMap.INCREMENT_BALANCE, ReceiverEventData)
    })

    this.eventEmitter.on(EventsMap.TRANSACTION_REVERTED, (data: ITransactionEvent) => {
      const SenderEventData: IChangeBalanceEvent = {
        id: data.idSender,
        amount: data.amount
      }

      const ReceiverEventData: IChangeBalanceEvent = {
        id: data.idReceiver,
        amount: data.amount
      }

      this.eventEmitter.emit(EventsMap.INCREMENT_BALANCE, SenderEventData)
      this.eventEmitter.emit(EventsMap.DECREMENT_BALANCE, ReceiverEventData)
    })
  }
}
