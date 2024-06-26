import { EntitiesName } from '@/constants/entities'
import { Account } from '@/core/account/domain/account.entity'
import { ReadAccountService } from '@/core/account/domain/service/read-account.service'
import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { Category } from '@/core/category/domain/category.entity'
import { ReadCategoryService } from '@/core/category/domain/service/read-category.service'
import { CurrentGQLUser } from '@/decorators/current-user.decorator'
import { Public } from '@/decorators/public.decorator'
import { GqlAuthGuard } from '@/guard/gql.guard'
import { Messages } from '@/messages'
import { NotFoundException, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { GQLCreateTransactionDTO } from '../domain/dto/create-transaction'
import { ReadTransactionService } from '../domain/service/read-transaction.service'
import { WriteTransactionService } from '../domain/service/write-transaction.service'
import { Transaction } from '../domain/transaction.entity'

@Public()
@UseGuards(GqlAuthGuard)
@Resolver(() => Transaction)
export class TransactionResolver {
  constructor (
    private readonly writeTransactionService: WriteTransactionService,
    private readonly readTransactionService: ReadTransactionService,
    private readonly readAccountService: ReadAccountService,
    private readonly readCategoryService: ReadCategoryService
  ) {}

  /* ---------- findAll ---------- */ // MARK: findAll
  @Query(() => [Transaction], { name: 'find_all_transaction' })
  async findAll (
    @CurrentGQLUser() UserData: PayloadPrimitive,
      @Args('AccountIndex', { type: () => Int }) AccountIndex: number
  ): Promise<Transaction[]> {
    const transactions = await this.readTransactionService.findAll({
      idUser: UserData.id,
      AccountIndex
    })

    return transactions
  }

  /* ---------- create ---------- */ // MARK: create
  @Mutation(() => Transaction, { name: 'create_transaction' })
  async create (
    @CurrentGQLUser() UserData: PayloadPrimitive,
      @Args('AccountIndex', { type: () => Int }) AccountIndex: number,
      @Args('data') data: GQLCreateTransactionDTO
  ): Promise<Transaction> {
    const transaction = await this.writeTransactionService.create({
      idUser: UserData.id,
      AccountIndex,
      data
    })

    return transaction
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  @Query(() => Transaction, { name: 'find_one_transaction' })
  async findOne (
    @CurrentGQLUser() UserData: PayloadPrimitive,
      @Args('AccountIndex', { type: () => Int }) AccountIndex: number,
      @Args('index', { type: () => Int }) index: number
  ): Promise<Transaction> {
    const transaction = await this.readTransactionService.findOne({
      idUser: UserData.id,
      AccountIndex,
      index
    })

    if (transaction === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.TRANSACTION))
    }

    return transaction
  }

  /* ---------- findOneAsSender ---------- */ // MARK: findOneAsSender
  @Query(() => Transaction, { name: 'find_one_transaction_sent' })
  async findOneAsSender (
    @CurrentGQLUser() UserData: PayloadPrimitive,
      @Args('AccountIndex', { type: () => Int }) AccountIndex: number,
      @Args('index', { type: () => Int }) index: number
  ): Promise<Transaction> {
    const transaction = await this.readTransactionService.findOneAsSender({
      idUser: UserData.id,
      AccountIndex,
      index
    })

    if (transaction === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.TRANSACTION))
    }

    return transaction
  }

  /* ---------- findOneAsReceiver ---------- */ // MARK: findOneAsReceiver
  @Query(() => Transaction, { name: 'find_one_transaction_received' })
  async findOneAsReceiver (
    @CurrentGQLUser() UserData: PayloadPrimitive,
      @Args('AccountIndex', { type: () => Int }) AccountIndex: number,
      @Args('index', { type: () => Int }) index: number
  ): Promise<Transaction> {
    const transaction = await this.readTransactionService.findOneAsReceiver({
      idUser: UserData.id,
      AccountIndex,
      index
    })

    if (transaction === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.TRANSACTION))
    }

    return transaction
  }

  /* ---------- delete ---------- */ // MARK: delete
  @Mutation(() => Boolean, { name: 'delete_transaction' })
  async delete (
    @CurrentGQLUser() UserData: PayloadPrimitive,
      @Args('AccountIndex', { type: () => Int }) AccountIndex: number,
      @Args('index', { type: () => Int }) index: number
  ): Promise<void> {
    await this.writeTransactionService.delete({ idUser: UserData.id, AccountIndex, index })
  }

  /* ---------- sender ---------- */ // MARK: sender
  @ResolveField(() => Account)
  async sender (@Parent() transaction: Transaction): Promise<Account> {
    const sender = await this.readAccountService.findByID({
      id: transaction.idSender
    })

    if (sender === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.ACCOUNT))
    }

    return sender
  }

  /* ---------- receiver ---------- */ // MARK: receiver
  @ResolveField(() => Account)
  async receiver (@Parent() transaction: Transaction): Promise<Account> {
    const receiver = await this.readAccountService.findByID({
      id: transaction.idReceiver
    })

    if (receiver === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.ACCOUNT))
    }

    return receiver
  }

  /* ---------- category ---------- */ // MARK: category
  @ResolveField(() => Category)
  async category (@Parent() transaction: Transaction): Promise<Category> {
    if (transaction.idCategory === null) {
      throw new NotFoundException(Messages.error.NoCategory)
    }

    const receiver = await this.readCategoryService.findOne({
      id: transaction.idCategory
    })

    if (receiver === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.ACCOUNT))
    }

    return receiver
  }
}
