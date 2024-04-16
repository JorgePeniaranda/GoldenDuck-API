import { EntitiesName } from '@/constants/entities'
import { Account } from '@/core/account/domain/account.entity'
import { ReadAccountService } from '@/core/account/domain/service/read-account.service'
import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { Public } from '@/decorators/public.decorator'
import { GqlAuthGuard } from '@/guard/gql.guard'
import { Messages } from '@/messages'
import { NotFoundException, Request, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { GQLCreateLoanDTO } from '../domain/dto/create-loan'
import { Loan } from '../domain/loan.entity'
import { ReadLoanService } from '../domain/service/read-loan.service'
import { WriteLoanService } from '../domain/service/write-loan.service'

@Public()
@UseGuards(GqlAuthGuard)
@Resolver(() => Loan)
export class LoanResolver {
  constructor (
    private readonly writeLoanService: WriteLoanService,
    private readonly readLoanService: ReadLoanService,
    private readonly readAccountService: ReadAccountService
  ) {}

  /* ---------- findAll ---------- */ // MARK: findAll
  @Query(() => Loan, { name: 'find_all_loan' })
  async findAll (
    @Request() UserData: PayloadPrimitive,
      @Args('AccountIndex', { type: () => Int }) AccountIndex: number
  ): Promise<Loan[]> {
    const loan = await this.readLoanService.findAll({
      idUser: UserData.id,
      AccountIndex
    })

    return loan
  }

  /* ---------- create ---------- */ // MARK: create
  @Mutation(() => Loan, { name: 'create_loan' })
  async create (@Args('data') data: GQLCreateLoanDTO): Promise<Loan> {
    const loan = await this.writeLoanService.create(data)

    return loan
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  @Query(() => Loan, { name: 'find_one_loan' })
  async findOne (
    @Request() UserData: PayloadPrimitive,
      @Args('AccountIndex', { type: () => Int }) AccountIndex: number,
      @Args('index', { type: () => Int }) index: number
  ): Promise<Loan> {
    const loan = await this.readLoanService.findOne({
      idUser: UserData.id,
      AccountIndex,
      index
    })

    if (loan === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.Loan))
    }

    return loan
  }

  /* ---------- delete ---------- */ // MARK: delete
  @Mutation(() => Loan, { name: 'delete_loan' })
  async delete (
    @Request() UserData: PayloadPrimitive,
      @Args('AccountIndex', { type: () => Int }) AccountIndex: number,
      @Args('index', { type: () => Int }) index: number
  ): Promise<void> {
    await this.writeLoanService.delete({
      idUser: UserData.id,
      AccountIndex,
      index
    })
  }

  /* ---------- account ---------- */ // MARK: account
  @ResolveField(() => Account)
  async account (@Parent() loan: Loan): Promise<Account> {
    const account = await this.readAccountService.findByID({
      id: loan.idAccount
    })

    if (account === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.ACCOUNT))
    }

    return account
  }
}
