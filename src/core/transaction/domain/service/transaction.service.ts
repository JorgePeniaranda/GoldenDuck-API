import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { Inject, Injectable } from '@nestjs/common'
import { type CreateTransactionDTO } from '../dto/create-transaction'
import { type Transaction } from '../transaction.entity'
import { type TransactionPrimitive } from '../transaction.primitive'
import { TransactionRepository } from '../transaction.repository'

@Injectable()
export class TransactionService {
  constructor (
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository
  ) {}

  public async create (data: CreateTransactionDTO): Promise<Transaction> {
    return await this.transactionRepository.create(data)

    // TO-DO: remover dinero de la cuenta de origen y agregarlo a la cuenta de destino
  }

  public async findAll (
    id: AccountPrimitive['id']
  ): Promise<Transaction[] | null> {
    return await this.transactionRepository.findAll(id)
  }

  public async findOne (
    id: TransactionPrimitive['id']
  ): Promise<Transaction | null> {
    return await this.transactionRepository.findOne(id)
  }

  public async delete (id: TransactionPrimitive['id']): Promise<void> {
    await this.transactionRepository.delete(id)

    // TO-DO: devolver dinero a la cuenta de origen y removerlo de la cuenta de destino
  }
}
