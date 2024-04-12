import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { Inject, Injectable } from '@nestjs/common'
import { type Transaction } from '../transaction.entity'
import { type TransactionPrimitive } from '../transaction.primitive'
import { TransactionRepository } from '../transaction.repository'

@Injectable()
export class ReadTransactionService {
  constructor (
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository
  ) {}

  public async findAll (id: AccountPrimitive['id']): Promise<Transaction[]> {
    return await this.transactionRepository.findAll(id)
  }

  public async findOne (
    idAccount: TransactionPrimitive['idSender'] | TransactionPrimitive['idReceiver'],
    index: number
  ): Promise<Transaction | null> {
    return await this.transactionRepository.findOne(idAccount, index)
  }

  public async findOneAsSender (
    idAccount: TransactionPrimitive['idSender'] | TransactionPrimitive['idReceiver'],
    index: number
  ): Promise<Transaction | null> {
    return await this.transactionRepository.findOneAsSender(idAccount, index)
  }

  public async findOneAsReceiver (
    idAccount: TransactionPrimitive['idSender'] | TransactionPrimitive['idReceiver'],
    index: number
  ): Promise<Transaction | null> {
    return await this.transactionRepository.findOneAsReceiver(idAccount, index)
  }

  public async findByID (id: TransactionPrimitive['id']): Promise<Transaction | null> {
    return await this.transactionRepository.findByID(id)
  }
}
