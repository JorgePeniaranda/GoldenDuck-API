import { EventsMap } from '@/constants/events'
import { ReadAccountService } from '@/core/account/domain/service/read-account.service'
import { AccountErrorsMessages } from '@/messages/error/account'
import { TransactionErrorsMessages } from '@/messages/error/transaction'
import { type ITransactionEvent } from '@/types/events'
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { type CreateTransactionDTO } from '../dto/create-transaction'
import { Transaction } from '../transaction.entity'
import { type TransactionPrimitive } from '../transaction.primitive'
import { TransactionRepository } from '../transaction.repository'

@Injectable()
export class WriteTransactionService {
  constructor (
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
    private readonly readAccountService: ReadAccountService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  public async create ({ idUser, AccountIndex, data }: {
    idUser: TransactionPrimitive['idSender']
    AccountIndex: number
    data: CreateTransactionDTO }
  ): Promise<Transaction> {
    const checkSender = await this.readAccountService.findOne({ idUser, index: AccountIndex })
    const checkReceiver = await this.readAccountService.findByID({ id: data.idReceiver })

    if (checkSender === null || checkReceiver === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    if (checkSender.balance < data.amount) {
      throw new BadRequestException(TransactionErrorsMessages.InsufficientFunds)
    }

    if (checkSender.id === data.idReceiver) {
      throw new ForbiddenException(TransactionErrorsMessages.SameAccount)
    }

    const transaction = Transaction.create({
      ...data,
      idSender: idUser
    })

    const EventData: ITransactionEvent = {
      idSender: idUser,
      idReceiver: data.idReceiver,
      amount: data.amount
    }

    this.eventEmitter.emit(EventsMap.TRANSACTION_CREATED, EventData)

    return await this.transactionRepository.create(transaction)
  }

  public async delete ({
    idUser,
    AccountIndex,
    index
  }: {
    idUser: TransactionPrimitive['idSender']
    AccountIndex: TransactionPrimitive['idSender'] | TransactionPrimitive['idReceiver']
    index: number
  }): Promise<void> {
    const account = await this.readAccountService.findOne({ idUser, index: AccountIndex })

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    const checkTransaction = await this.transactionRepository.findOne({
      idAccount: account.id,
      index
    })

    if (checkTransaction === null) {
      throw new NotFoundException(TransactionErrorsMessages.NotFound)
    }

    const transaction = await this.transactionRepository.delete(checkTransaction)

    const EventData: ITransactionEvent = {
      idSender: transaction.idSender,
      idReceiver: transaction.idReceiver,
      amount: transaction.amount
    }

    this.eventEmitter.emit(EventsMap.TRANSACTION_REVERTED, EventData)
  }
}
