import { Account } from '@/core/account/domain/account.entity'
import { ReadAccountService } from '@/core/account/domain/service/read-account.service'
import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { Public } from '@/decorators/public.decorator'
import { GqlAuthGuard } from '@/guard/gql.guard'
import { AccountErrorsMessages } from '@/messages/error/account'
import { LoanErrorsMessages } from '@/messages/error/loan'
import { NotFoundException, Request, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { CreateLoanDTO } from '../domain/dto/create-loan'
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

  @Mutation(() => Loan, { name: 'create_loan' })
  async create (@Args('data') data: CreateLoanDTO): Promise<Loan> {
    const loan = await this.writeLoanService.create(data)

    return loan
  }

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
      throw new NotFoundException(LoanErrorsMessages.NotFound)
    }

    return loan
  }

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

  @ResolveField(() => Account)
  async receiver (@Parent() loan: Loan): Promise<Account> {
    const receiver = await this.readAccountService.findByID({
      id: loan.idAccount
    })

    if (receiver === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    return receiver
  }
}
