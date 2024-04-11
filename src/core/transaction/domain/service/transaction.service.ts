import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { ReadAccountService } from '@/core/account/domain/service/read-account.service'
import { AccountErrorsMessages } from '@/messages/error/account'
import { TransactionErrorsMessages } from '@/messages/error/transaction'
import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { type CreateTransactionDTO } from '../dto/create-transaction'
import { type Transaction } from '../transaction.entity'
import { type TransactionPrimitive } from '../transaction.primitive'
import { TransactionRepository } from '../transaction.repository'

@Injectable()
export class TransactionService {
  constructor (
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
    private readonly readAccountService: ReadAccountService
  ) {}

  public async create (idUser: TransactionPrimitive['idSender'], data: CreateTransactionDTO): Promise<Transaction> {
    const checkSender = await this.readAccountService.findByID(idUser)
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

    if (idUser !== checkSender.idUser) {
      throw new ForbiddenException(TransactionErrorsMessages.NotOwner)
    }

    return await this.transactionRepository.create(data)

    // TO-DO: remover dinero de la cuenta de origen y agregarlo a la cuenta de destino
  }

  public async findAll (id: AccountPrimitive['id']): Promise<Transaction[] | null> {
    return await this.transactionRepository.findAll(id)
  }

  public async findOne (id: TransactionPrimitive['id']): Promise<Transaction | null> {
    return await this.transactionRepository.findOne(id)
  }

  public async delete (id: TransactionPrimitive['id']): Promise<void> {
    await this.transactionRepository.delete(id)

    // TO-DO: devolver dinero a la cuenta de origen y removerlo de la cuenta de destino
  }
}
