import { EntitiesName } from '@/constants/entities'
import { EventsMap } from '@/constants/events'
import { ReadAccountService } from '@/core/account/domain/service/read-account.service'
import { Messages } from '@/messages'
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

  /* ---------- create ---------- */ // MARK: create
  public async create ({
    idUser,
    AccountIndex,
    data
  }: {
    idUser: TransactionPrimitive['idSender']
    AccountIndex: number
    data: CreateTransactionDTO
  }): Promise<Transaction> {
    const checkSender = await this.readAccountService.findOne({ idUser, index: AccountIndex })
    const checkReceiver = await this.readAccountService.findByID({ id: data.idReceiver })

    if (checkSender === null || checkReceiver === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.ACCOUNT))
    }

    if (checkSender.balance < data.amount) {
      throw new BadRequestException(Messages.error.InsufficientFunds)
    }

    if (checkSender.id === data.idReceiver) {
      throw new ForbiddenException(Messages.error.SameAccount)
    }

    const transaction = Transaction.create({
      ...data,
      idSender: checkSender.id,
      idReceiver: checkReceiver.id
    })

    this.eventEmitter.emit(EventsMap.TRANSACTION_CREATED, transaction.toJSON())

    return await this.transactionRepository.create(transaction)
  }

  /* ---------- delete ---------- */ // MARK: delete
  public async delete ({
    idUser,
    AccountIndex,
    index
  }: {
    idUser: TransactionPrimitive['idSender']
    AccountIndex: number
    index: number
  }): Promise<void> {
    const account = await this.readAccountService.findOne({ idUser, index: AccountIndex })

    if (account === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.ACCOUNT))
    }

    const checkTransaction = await this.transactionRepository.findOne({
      idAccount: account.id,
      index
    })

    if (checkTransaction === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.TRANSACTION))
    }

    const transaction = await this.transactionRepository.delete(checkTransaction)

    this.eventEmitter.emit(EventsMap.TRANSACTION_REVERTED, transaction.toJSON())
  }
}
