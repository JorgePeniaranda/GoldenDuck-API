import { EntitiesName } from '@/constants/entities'
import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { Card } from '@/core/card/domain/card.entity'
import { ReadCardService } from '@/core/card/domain/service/read-card.service'
import { Investment } from '@/core/investment/domain/investment.entity'
import { ReadInvestmentService } from '@/core/investment/domain/service/read-investment.service'
import { Loan } from '@/core/loan/domain/loan.entity'
import { ReadLoanService } from '@/core/loan/domain/service/read-loan.service'
import { ReadTransactionService } from '@/core/transaction/domain/service/read-transaction.service'
import { Transaction } from '@/core/transaction/domain/transaction.entity'
import { ReadUserService } from '@/core/user/domain/service/read-user.service'
import { User } from '@/core/user/domain/user.entity'
import { CurrentGQLUser } from '@/decorators/current-user.decorator'
import { Public } from '@/decorators/public.decorator'
import { GqlAuthGuard } from '@/guard/gql.guard'
import { Messages } from '@/messages'
import { NotFoundException, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Account } from '../domain/account.entity'
import { ReadAccountService } from '../domain/service/read-account.service'
import { WriteAccountService } from '../domain/service/write-account.service'

@Public()
@UseGuards(GqlAuthGuard)
@Resolver(() => Account)
export class AccountResolver {
  constructor (
    private readonly writeAccountService: WriteAccountService,
    private readonly readAccountService: ReadAccountService,
    private readonly readUserService: ReadUserService,
    private readonly readCardService: ReadCardService,
    private readonly readTransactionService: ReadTransactionService,
    private readonly readLoanService: ReadLoanService,
    private readonly readInvestmentService: ReadInvestmentService
  ) {}

  /* ---------- findAll ---------- */ // MARK: findAll
  @Query(() => Account, { name: 'find_all_account' })
  async findAll (@CurrentGQLUser() UserData: PayloadPrimitive): Promise<Account[]> {
    const accounts = await this.readAccountService.findAll({
      idUser: UserData.id
    })

    return accounts
  }

  /* ---------- CurrentUser ---------- */ // MARK: CurrentUser
  @Mutation(() => Account, { name: 'create_account' })
  async create (@CurrentGQLUser() UserData: PayloadPrimitive): Promise<Account> {
    const account = await this.writeAccountService.create({
      idUser: UserData.id
    })

    return account
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  @Query(() => Account, { name: 'find_one_account' })
  async findOne (
    @CurrentGQLUser() UserData: PayloadPrimitive,
      @Args('index', { type: () => Int }) index: number
  ): Promise<Account> {
    const account = await this.readAccountService.findOne({ idUser: UserData.id, index })

    if (account === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.ACCOUNT))
    }

    return account
  }

  /* ---------- delete ---------- */ // MARK: delete
  @Mutation(() => Account, { name: 'delete_account' })
  async delete (
    @CurrentGQLUser() UserData: PayloadPrimitive,
      @Args('index', { type: () => Int }) index: number
  ): Promise<void> {
    await this.writeAccountService.delete({ idUser: UserData.id, index })
  }

  /* ---------- user ---------- */ // MARK: user
  @ResolveField(() => User)
  async user (@Parent() account: Account): Promise<User> {
    const user = await this.readUserService.findByID({
      id: account.idUser
    })

    if (user === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.USER))
    }

    return user
  }

  /* ---------- cards ---------- */ // MARK: cards
  @ResolveField(() => [Card])
  async cards (@Parent() account: Account): Promise<Card[]> {
    const user = await this.readCardService.findAllByIDAccount({
      idAccount: account.id
    })

    if (user === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.USER))
    }

    return user
  }

  /* ---------- transactionsSend ---------- */ // MARK: transactionsSend
  @ResolveField(() => [Transaction])
  async transactionsSend (@Parent() account: Account): Promise<Transaction[]> {
    const transactionsSend = await this.readTransactionService.findAllByIDAccount({
      idAccount: account.id
    })

    if (transactionsSend === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.TRANSACTION))
    }

    return transactionsSend
  }

  /* ---------- transactionsReceived ---------- */ // MARK: transactionsReceived
  @ResolveField(() => [Transaction])
  async transactionsReceived (@Parent() account: Account): Promise<Transaction[]> {
    const transactionsReceived = await this.readTransactionService.findAllByIDAccount({
      idAccount: account.id
    })

    if (transactionsReceived === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.TRANSACTION))
    }

    return transactionsReceived
  }

  /* ---------- loans ---------- */ // MARK: loans
  @ResolveField(() => [Loan])
  async loans (@Parent() account: Account): Promise<Loan[]> {
    const loans = await this.readLoanService.findAllByIDAccount({
      idAccount: account.id
    })

    if (loans === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.LOAN))
    }

    return loans
  }

  /* ---------- investments ---------- */ // MARK: investments
  @ResolveField(() => [Investment])
  async investments (@Parent() account: Account): Promise<Investment[]> {
    const investments = await this.readInvestmentService.findAllByIDAccount({
      idAccount: account.id
    })

    if (investments === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.LOAN))
    }

    return investments
  }
}
