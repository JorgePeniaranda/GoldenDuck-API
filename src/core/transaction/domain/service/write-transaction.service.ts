import { EventsMap } from '@/constants/events'
import { ReadAccountService } from '@/core/account/domain/service/read-account.service'
import { AccountErrorsMessages } from '@/messages/error/account'
import { TransactionErrorsMessages } from '@/messages/error/transaction'
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

  public async create (
    idUser: TransactionPrimitive['idSender'],
    index: number,
    data: CreateTransactionDTO
  ): Promise<Transaction> {
    const checkSender = await this.readAccountService.findOne(idUser, index)
    const checkReceiver = await this.readAccountService.findByID(data.idReceiver)

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

    this.eventEmitter.emit(EventsMap.TRANSACTION_CREATED, {
      idSender: idUser,
      idReceiver: data.idReceiver,
      amount: data.amount
    })

    return await this.transactionRepository.create(transaction)

    // TO-DO: remover dinero de la cuenta de origen y agregarlo a la cuenta de destino
  }

  public async delete (
    idAccount: TransactionPrimitive['idSender'] | TransactionPrimitive['idReceiver'],
    index: number
  ): Promise<void> {
    const checkTransaction = await this.transactionRepository.findOne(idAccount, index)

    if (checkTransaction === null) {
      throw new NotFoundException(TransactionErrorsMessages.NotFound)
    }

    const transaction = await this.transactionRepository.delete(checkTransaction)

    this.eventEmitter.emit(EventsMap.TRANSACTION_CREATED, {
      idSender: transaction.idSender,
      idReceiver: transaction.idReceiver,
      amount: transaction.amount
    })

    // TO-DO: devolver dinero a la cuenta de origen y removerlo de la cuenta de destino
  }
}
