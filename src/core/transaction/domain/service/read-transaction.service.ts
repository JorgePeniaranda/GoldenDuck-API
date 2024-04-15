import { EntitiesName } from '@/constants/entities'
import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { ReadAccountService } from '@/core/account/domain/service/read-account.service'
import { Messages } from '@/messages'
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

  /* ---------- findAll ---------- */ // MARK: findAll
  public async findAll ({
    idUser,
    AccountIndex
  }: {
    idUser: AccountPrimitive['idUser']
    AccountIndex: number
  }): Promise<Transaction[]> {
    const account = await this.readAccountService.findOne({ idUser, index: AccountIndex })

    if (account === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.ACCOUNT))
    }

    return await this.transactionRepository.findAll({ idAccount: account.id })
  }

  /* ---------- findAllByIDAccount ---------- */ // MARK: findAllByIDAccount
  public async findAllByIDAccount ({
    idAccount
  }: {
    idAccount: TransactionPrimitive['idSender'] | TransactionPrimitive['idReceiver']
  }): Promise<Transaction[]> {
    return await this.transactionRepository.findAll({ idAccount })
  }

  /* ---------- findOne ---------- */ // MARK: findOne
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
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.ACCOUNT))
    }

    return await this.transactionRepository.findOne({
      idAccount: account.id,
      index
    })
  }

  /* ---------- findOneAsSender ---------- */ // MARK: findOneAsSender
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
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.ACCOUNT))
    }

    return await this.transactionRepository.findOneAsSender({
      idSender: account.id,
      index
    })
  }

  /* ---------- findOneAsSenderByIDAccount ---------- */ // MARK: findOneAsSenderByIDAccount
  public async findOneAsSenderByIDAccount ({
    idSender,
    index
  }: {
    idSender: TransactionPrimitive['idSender']
    index: number
  }): Promise<Transaction | null> {
    return await this.transactionRepository.findOneAsSender({
      idSender,
      index
    })
  }

  /* ---------- findOneAsReceiver ---------- */ // MARK: findOneAsReceiver
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
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.ACCOUNT))
    }

    return await this.transactionRepository.findOneAsReceiver({
      idReceiver: account.id,
      index
    })
  }

  /* ---------- findOneAsReceiverByIDAccount ---------- */ // MARK: findOneAsReceiverByIDAccount
  public async findOneAsReceiverByIDAccount ({
    idReceiver,
    index
  }: {
    idReceiver: TransactionPrimitive['idReceiver']
    index: number
  }): Promise<Transaction | null> {
    return await this.transactionRepository.findOneAsReceiver({
      idReceiver,
      index
    })
  }

  public async findByID ({ id }: { id: TransactionPrimitive['id'] }): Promise<Transaction | null> {
    return await this.transactionRepository.findByID(id)
  }
}
