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

  public async findAll ({
    idUser,
    AccountIndex
  }: {
    idUser: AccountPrimitive['idUser']
    AccountIndex: number
  }): Promise<Transaction[]> {
    const account = await this.readAccountService.findOne({ idUser, index: AccountIndex })

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    return await this.transactionRepository.findAll(account.id)
  }

  public async findOne ({
    idUser,
    AccountIndex,
    index
  }: {
    idUser: AccountPrimitive['idUser']
    AccountIndex: number
    index: number
  }): Promise<Transaction | null> {
    const account = await this.readAccountService.findOne({ idUser, index: AccountIndex })

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    return await this.transactionRepository.findOne({
      idAccount: account.id,
      index
    })
  }

  public async findOneAsSender ({
    idUser,
    AccountIndex,
    index
  }: {
    idUser: AccountPrimitive['idUser']
    AccountIndex: number
    index: number
  }): Promise<Transaction | null> {
    const account = await this.readAccountService.findOne({ idUser, index: AccountIndex })

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    return await this.transactionRepository.findOneAsSender({
      idSender: account.id,
      index
    })
  }

  public async findOneAsReceiver ({
    idUser,
    AccountIndex,
    index
  }: {
    idUser: AccountPrimitive['idUser']
    AccountIndex: number
    index: number
  }): Promise<Transaction | null> {
    const account = await this.readAccountService.findOne({ idUser, index: AccountIndex })

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    return await this.transactionRepository.findOneAsReceiver({
      idReceiver: account.id,
      index
    })
  }

  public async findByID ({ id }: { id: TransactionPrimitive['id'] }): Promise<Transaction | null> {
    return await this.transactionRepository.findByID(id)
  }
}
