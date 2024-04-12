import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { ReadAccountService } from '@/core/account/domain/service/read-account.service'
import { AccountErrorsMessages } from '@/messages/error/account'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { type Transaction } from '../transaction.entity'
import { type TransactionPrimitive } from '../transaction.primitive'
import { TransactionRepository } from '../transaction.repository'

@Injectable()
export class ReadTransactionService {
  constructor (
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
    private readonly readAccountService: ReadAccountService
  ) {}

  public async findAll (
    idUser: AccountPrimitive['idUser'],
    AccountIndex: AccountPrimitive['id']
  ): Promise<Transaction[]> {
    const account = await this.readAccountService.findOne(idUser, AccountIndex)

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    return await this.transactionRepository.findAll(account.id)
  }

  public async findOne (
    idUser: AccountPrimitive['idUser'],
    AccountIndex: TransactionPrimitive['idSender'] | TransactionPrimitive['idReceiver'],
    index: number
  ): Promise<Transaction | null> {
    const account = await this.readAccountService.findOne(idUser, AccountIndex)

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    return await this.transactionRepository.findOne(account.id, index)
  }

  public async findOneAsSender (
    idUser: AccountPrimitive['idUser'],
    AccountIndex: TransactionPrimitive['idSender'] | TransactionPrimitive['idReceiver'],
    index: number
  ): Promise<Transaction | null> {
    const account = await this.readAccountService.findOne(idUser, AccountIndex)

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    return await this.transactionRepository.findOneAsSender(account.id, index)
  }

  public async findOneAsReceiver (
    idUser: AccountPrimitive['idUser'],
    AccountIndex: TransactionPrimitive['idSender'] | TransactionPrimitive['idReceiver'],
    index: number
  ): Promise<Transaction | null> {
    const account = await this.readAccountService.findOne(idUser, AccountIndex)

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    return await this.transactionRepository.findOneAsReceiver(account.id, index)
  }

  public async findByID (id: TransactionPrimitive['id']): Promise<Transaction | null> {
    return await this.transactionRepository.findByID(id)
  }
}
