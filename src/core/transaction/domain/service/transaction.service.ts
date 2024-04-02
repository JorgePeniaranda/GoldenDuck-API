import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { Inject, Injectable } from '@nestjs/common'
import { type CreateTransactionDTO } from '../dto/create-transaction'
import { type Transaction } from '../transaction.entity'
import { type TransactionPrimitive } from '../transaction.primitive'
import { TransactionRepository } from '../transaction.repository'

@Injectable()
export class TransactionService {
  constructor (@Inject('TransactionRepository') private readonly transactionRepository: TransactionRepository) {}

  public async create (data: CreateTransactionDTO): Promise<Transaction> {
    return await this.transactionRepository.create(data)
  }

  public async getAll (id: AccountPrimitive['id']): Promise<Transaction[] | null> {
    return await this.transactionRepository.getAll(id)
  }

  public async find (id: TransactionPrimitive['id']): Promise<Transaction | null> {
    return await this.transactionRepository.find(id)
  }

  public async delete (id: TransactionPrimitive['id']): Promise<void> {
    await this.transactionRepository.delete(id)
  }
}
