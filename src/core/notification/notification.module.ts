import { EventsMap } from '@/constants/events'
import { Messages } from '@/messages'
import { Module } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { PrismaService } from '../../services/prisma.service'
import { AccountModule } from '../account/account.module'
import { type AccountPrimitive } from '../account/domain/account.primitive'
import { ReadAccountService } from '../account/domain/service/read-account.service'
import { type InvestmentPrimitive } from '../investment/domain/investment.primitive'
import { type LoanPrimitive } from '../loan/domain/loan.primitive'
import { type MessagePrimitive } from '../message/domain/message.primitive'
import { type SessionPrimitive } from '../session/domain/session.primitive'
import { type TransactionPrimitive } from '../transaction/domain/transaction.primitive'
import { type UserPrimitive } from '../user/domain/user.primitive'
import { UserModule } from '../user/user.module'
import { NotificationRepositoryPrismaMySQL } from './data-access/notification-prisma-mysql.repository'
import { ReadNotificationService } from './domain/service/read-notification.service'
import { WriteNotificationService } from './domain/service/write-notification.service'
import { NotificationController } from './entry-points/notification.controller'
import { NotificationResolver } from './entry-points/notification.resolver'

@Module({
  imports: [AccountModule, UserModule],
  controllers: [NotificationController],
  providers: [
    WriteNotificationService,
    ReadNotificationService,
    NotificationResolver,
    {
      provide: 'NotificationRepository',
      useClass: NotificationRepositoryPrismaMySQL
    },
    PrismaService
  ],
  exports: [ReadNotificationService]
})
export class NotificationModule {
  constructor (
    private readonly readAccountService: ReadAccountService,
    private readonly eventEmitter: EventEmitter2
  ) {
    // #region EVENTS SUBSCRIPTION
    /* ------------------------- USER EVENTS ------------------------- */

    this.eventEmitter.on(EventsMap.USER_ACTIVATED, (data: UserPrimitive) => {
      const params: Parameters<WriteNotificationService['create']>[0] = {
        idUser: data.id,
        message: Messages.response.UserActivated
      }

      this.eventEmitter.emit(EventsMap.CREATE_NOTIFICATION, params)
    })

    this.eventEmitter.on(EventsMap.USER_PASSWORD_UPDATED, (data: UserPrimitive) => {
      const params: Parameters<WriteNotificationService['create']>[0] = {
        idUser: data.id,
        message: Messages.response.UserPasswordUpdated
      }

      this.eventEmitter.emit(EventsMap.CREATE_NOTIFICATION, params)
    })

    this.eventEmitter.on(EventsMap.USER_DELETED, (data: UserPrimitive) => {
      const params: Parameters<WriteNotificationService['create']>[0] = {
        idUser: data.id,
        message: Messages.response.UserDeleted
      }

      this.eventEmitter.emit(EventsMap.CREATE_NOTIFICATION, params)
    })

    /* ------------------------- ACCOUNT EVENTS ------------------------- */

    this.eventEmitter.on(EventsMap.ACCOUNT_CREATED, (data: AccountPrimitive) => {
      const params: Parameters<WriteNotificationService['create']>[0] = {
        idUser: data.idUser,
        message: Messages.response.CreateAccount
      }

      this.eventEmitter.emit(EventsMap.CREATE_NOTIFICATION, params)
    })

    /* ------------------------- TRANSACTION EVENTS ------------------------- */

    this.eventEmitter.on(EventsMap.TRANSACTION_CREATED, (data: TransactionPrimitive) => {
      this.readAccountService
        .findIDUser({
          id: data.idSender
        })
        .then(idUser => {
          const senderParams: Parameters<WriteNotificationService['create']>[0] = {
            idUser,
            message: Messages.response.TransactionSent(data.idReceiver)
          }

          this.eventEmitter.emit(EventsMap.CREATE_NOTIFICATION, senderParams)
        })
        .catch(error => {
          throw error
        })

      this.readAccountService
        .findIDUser({
          id: data.idReceiver
        })
        .then(idUser => {
          const receiverParams: Parameters<WriteNotificationService['create']>[0] = {
            idUser,
            message: Messages.response.NewTransactionReceived(data.idSender)
          }

          this.eventEmitter.emit(EventsMap.CREATE_NOTIFICATION, receiverParams)
        })
        .catch(error => {
          throw error
        })
    })

    this.eventEmitter.on(EventsMap.TRANSACTION_REVERTED, (data: TransactionPrimitive) => {
      this.readAccountService
        .findIDUser({
          id: data.idSender
        })
        .then(idUser => {
          const senderParams: Parameters<WriteNotificationService['create']>[0] = {
            idUser,
            message: Messages.response.TransactionSentRejected(data.idReceiver)
          }
          console.log(data.idReceiver)
          console.log(data.idSender)

          this.eventEmitter.emit(EventsMap.CREATE_NOTIFICATION, senderParams)
        })
        .catch(error => {
          throw error
        })

      this.readAccountService
        .findIDUser({
          id: data.idReceiver
        })
        .then(idUser => {
          const receiverParams: Parameters<WriteNotificationService['create']>[0] = {
            idUser,
            message: Messages.response.TransactionReceivedRejected(data.idSender)
          }

          this.eventEmitter.emit(EventsMap.CREATE_NOTIFICATION, receiverParams)
        })
        .catch(error => {
          throw error
        })
    })

    /* ------------------------- MESSAGE EVENTS ------------------------- */

    this.eventEmitter.on(EventsMap.MESSAGE_CREATED, (data: MessagePrimitive) => {
      const receiverParams: Parameters<WriteNotificationService['create']>[0] = {
        idUser: data.idReceiver,
        message: Messages.response.NewMessageReceived(data.idSender)
      }

      this.eventEmitter.emit(EventsMap.CREATE_NOTIFICATION, receiverParams)
    })

    /* ------------------------- SESSION EVENTS ------------------------- */

    this.eventEmitter.on(EventsMap.SESSION_CREATED, (data: SessionPrimitive) => {
      const params: Parameters<WriteNotificationService['create']>[0] = {
        idUser: data.idUser,
        message: Messages.response.NewSession
      }

      this.eventEmitter.emit(EventsMap.CREATE_NOTIFICATION, params)
    })

    /* ------------------------- LOAN EVENTS ------------------------- */

    this.eventEmitter.on(EventsMap.LOAN_CREATED, (data: LoanPrimitive) => {
      this.readAccountService
        .findIDUser({
          id: data.idAccount
        })
        .then(idUser => {
          const receiverParams: Parameters<WriteNotificationService['create']>[0] = {
            idUser,
            message: Messages.response.LoanCreated
          }

          this.eventEmitter.emit(EventsMap.CREATE_NOTIFICATION, receiverParams)
        })
        .catch(error => {
          throw error
        })
    })

    this.eventEmitter.on(EventsMap.LOAN_CANCELLED, (data: LoanPrimitive) => {
      this.readAccountService
        .findIDUser({
          id: data.idAccount
        })
        .then(idUser => {
          const receiverParams: Parameters<WriteNotificationService['create']>[0] = {
            idUser,
            message: Messages.response.LoanCancelled
          }

          this.eventEmitter.emit(EventsMap.CREATE_NOTIFICATION, receiverParams)
        })
        .catch(error => {
          throw error
        })
    })

    /* ------------------------- INVESTMENT EVENTS ------------------------- */

    this.eventEmitter.on(EventsMap.INVESTMENT_CREATED, (data: InvestmentPrimitive) => {
      this.readAccountService
        .findIDUser({
          id: data.idAccount
        })
        .then(idUser => {
          const receiverParams: Parameters<WriteNotificationService['create']>[0] = {
            idUser,
            message: Messages.response.InvestmentCreated
          }

          this.eventEmitter.emit(EventsMap.CREATE_NOTIFICATION, receiverParams)
        })
        .catch(error => {
          throw error
        })
    })

    this.eventEmitter.on(EventsMap.INVESTMENT_CANCELLED, (data: InvestmentPrimitive) => {
      this.readAccountService
        .findIDUser({
          id: data.idAccount
        })
        .then(idUser => {
          const receiverParams: Parameters<WriteNotificationService['create']>[0] = {
            idUser,
            message: Messages.response.InvestmentCancelled
          }

          this.eventEmitter.emit(EventsMap.CREATE_NOTIFICATION, receiverParams)
        })
        .catch(error => {
          throw error
        })
    })
  }
}
