import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { CurrentUser } from '@/decorators/current-user.decorator'
import { Public } from '@/decorators/public.decorator'
import { GqlAuthGuard } from '@/guard/gql.guard'
import { TransactionErrorsMessages } from '@/messages/error/transaction'
import {
  NotFoundException,
  UseGuards
} from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateTransactionDTO } from '../domain/dto/create-transaction'
import { ReadTransactionService } from '../domain/service/read-transaction.service'
import { WriteTransactionService } from '../domain/service/write-transaction.service'
import { Transaction } from '../domain/transaction.entity'

@Public()
@UseGuards(GqlAuthGuard)
@Resolver()
export class TransactionResolver {
  constructor (
    private readonly readTransactionService: ReadTransactionService,
    private readonly writeTransactionService: WriteTransactionService
  ) {}

  @Query(() => [Transaction], { name: 'find_all_transaction' })
  async findAll (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('AccountIndex', { type: () => Int }) AccountIndex: number
  ): Promise<Transaction[]> {
    const transactions = await this.readTransactionService.findAll({
      idUser: UserData.id,
      AccountIndex
    })

    return transactions
  }

  @Mutation(() => Transaction, { name: 'create_transaction' })
  async create (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('AccountIndex', { type: () => Int }) AccountIndex: number,
      @Args('data') data: CreateTransactionDTO
  ): Promise<Transaction> {
    const transaction = await this.writeTransactionService.create({
      idUser: UserData.id,
      AccountIndex,
      data
    })

    return transaction
  }

  @Query(() => Transaction, { name: 'find_one_transaction' })
  async findOne (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('AccountIndex', { type: () => Int }) AccountIndex: number,
      @Args('index', { type: () => Int }) index: number
  ): Promise<Transaction> {
    const transaction = await this.readTransactionService.findOne({
      idUser: UserData.id,
      AccountIndex,
      index
    })

    if (transaction === null) {
      throw new NotFoundException(TransactionErrorsMessages.NotFound)
    }

    return transaction
  }

  @Query(() => Transaction, { name: 'find_one_transaction_sent' })
  async findOneAsSender (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('AccountIndex', { type: () => Int }) AccountIndex: number,
      @Args('index', { type: () => Int }) index: number
  ): Promise<Transaction> {
    const transaction = await this.readTransactionService.findOneAsSender({
      idUser: UserData.id,
      AccountIndex,
      index
    })

    if (transaction === null) {
      throw new NotFoundException(TransactionErrorsMessages.NotFound)
    }

    return transaction
  }

  @Query(() => Transaction, { name: 'find_one_transaction_received' })
  async findOneAsReceiver (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('AccountIndex', { type: () => Int }) AccountIndex: number,
      @Args('index', { type: () => Int }) index: number
  ): Promise<Transaction> {
    const transaction = await this.readTransactionService.findOneAsReceiver({
      idUser: UserData.id,
      AccountIndex,
      index
    })

    if (transaction === null) {
      throw new NotFoundException(TransactionErrorsMessages.NotFound)
    }

    return transaction
  }

  @Mutation(() => Boolean, { name: 'delete_transaction' })
  async delete (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('AccountIndex', { type: () => Int }) AccountIndex: number,
      @Args('index', { type: () => Int }) index: number
  ): Promise<boolean> {
    await this.writeTransactionService.delete({ idUser: UserData.id, AccountIndex, index })

    return true
  }
}
