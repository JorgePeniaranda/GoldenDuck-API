import { EventsMap } from '@/constants/events'
import { forwardRef, Module } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { PrismaService } from '../../services/prisma.service'
import { CardModule } from '../card/card.module'
import { InvestmentModule } from '../investment/investment.module'
import { type LoanPrimitive } from '../loan/domain/loan.primitive'
import { LoanModule } from '../loan/loan.module'
import { type Transaction } from '../transaction/domain/transaction.entity'
import { type TransactionPrimitive } from '../transaction/domain/transaction.primitive'
import { TransactionModule } from '../transaction/transactions.module'
import { type UserPrimitive } from '../user/domain/user.primitive'
import { UserModule } from '../user/user.module'
import { AccountRepositoryPrismaMySQL } from './data-access/account-prisma-mysql.repository'
import { ReadAccountService } from './domain/service/read-account.service'
import { WriteAccountService } from './domain/service/write-account.service'
import { AccountController } from './entry-points/account.controller'
import { AccountResolver } from './entry-points/account.resolver'

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => CardModule),
    forwardRef(() => TransactionModule),
    forwardRef(() => LoanModule),
    forwardRef(() => InvestmentModule)
  ],
  controllers: [AccountController],
  providers: [
    WriteAccountService,
    ReadAccountService,
    AccountResolver,
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
    // #region EVENTS SUBSCRIPTION
    /* ------------------------- USER EVENTS ------------------------- */

    this.eventEmitter.on(EventsMap.USER_CREATED, (data: UserPrimitive) => {
      const params: Parameters<WriteAccountService['create']>[0] = {
        idUser: data.id
      }

      this.eventEmitter.emit(EventsMap.CREATE_ACCOUNT, params)
    })

    /* ------------------------- TRANSACTION EVENTS ------------------------- */

    this.eventEmitter.on(EventsMap.TRANSACTION_CREATED, (data: TransactionPrimitive) => {
      const senderParams: Parameters<WriteAccountService['decrementBalance']>[0] = {
        id: data.idSender,
        amount: data.amount
      }

      const receiverParams: Parameters<WriteAccountService['increaseBalance']>[0] = {
        id: data.idReceiver,
        amount: data.amount
      }

      this.eventEmitter.emit(EventsMap.ACCOUNT_DECREMENT_BALANCE, senderParams)
      this.eventEmitter.emit(EventsMap.ACCOUNT_INCREMENT_BALANCE, receiverParams)
    })

    this.eventEmitter.on(EventsMap.TRANSACTION_REVERTED, (data: Transaction) => {
      const senderParams: Parameters<WriteAccountService['increaseBalance']>[0] = {
        id: data.idSender,
        amount: data.amount
      }

      const receiverParams: Parameters<WriteAccountService['decrementBalance']>[0] = {
        id: data.idReceiver,
        amount: data.amount
      }

      this.eventEmitter.emit(EventsMap.ACCOUNT_INCREMENT_BALANCE, senderParams)
      this.eventEmitter.emit(EventsMap.ACCOUNT_DECREMENT_BALANCE, receiverParams)
    })

    /* ------------------------- LOAN EVENTS ------------------------- */

    this.eventEmitter.on(EventsMap.LOAN_CREATED, (data: LoanPrimitive) => {
      const params: Parameters<WriteAccountService['decrementBalance']>[0] = {
        id: data.idAccount,
        amount: data.amount
      }

      this.eventEmitter.emit(EventsMap.ACCOUNT_DECREMENT_BALANCE, params)
    })

    this.eventEmitter.on(EventsMap.LOAN_CANCELLED, (data: LoanPrimitive) => {
      const params: Parameters<WriteAccountService['increaseBalance']>[0] = {
        id: data.idAccount,
        amount: data.amount
      }

      this.eventEmitter.emit(EventsMap.ACCOUNT_INCREMENT_BALANCE, params)
    })

    /* ------------------------- INVESTMENT EVENTS ------------------------- */

    this.eventEmitter.on(EventsMap.INVESTMENT_CREATED, (data: LoanPrimitive) => {
      const params: Parameters<WriteAccountService['decrementBalance']>[0] = {
        id: data.idAccount,
        amount: data.amount
      }

      this.eventEmitter.emit(EventsMap.ACCOUNT_DECREMENT_BALANCE, params)
    })

    this.eventEmitter.on(EventsMap.INVESTMENT_CANCELLED, (data: LoanPrimitive) => {
      const params: Parameters<WriteAccountService['increaseBalance']>[0] = {
        id: data.idAccount,
        amount: data.amount
      }

      this.eventEmitter.emit(EventsMap.ACCOUNT_INCREMENT_BALANCE, params)
    })
  }
}
