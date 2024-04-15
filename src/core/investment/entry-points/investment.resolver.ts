import { Account } from '@/core/account/domain/account.entity'
import { ReadAccountService } from '@/core/account/domain/service/read-account.service'
import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { CurrentUser } from '@/decorators/current-user.decorator'
import { Public } from '@/decorators/public.decorator'
import { GqlAuthGuard } from '@/guard/gql.guard'
import { AccountErrorsMessages } from '@/messages/error/account'
import { InvestmentErrorsMessages } from '@/messages/error/investment'
import { Body, NotFoundException, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { GQLCreateInvestmentDTO } from '../domain/dto/create-investment'
import { Investment } from '../domain/investment.entity'
import { ReadInvestmentService } from '../domain/service/read-investment.service'
import { WriteInvestmentService } from '../domain/service/write-investment.service'

@Public()
@UseGuards(GqlAuthGuard)
@Resolver(() => Investment)
export class InvestmentResolver {
  constructor (
    private readonly writeInvestmentService: WriteInvestmentService,
    private readonly readInvestmentService: ReadInvestmentService,
    private readonly readAccountService: ReadAccountService
  ) {}

  @Query(() => [Investment], { name: 'find_all_investment' })
  async findAll (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('AccountIndex', { type: () => Int }) AccountIndex: number
  ): Promise<Investment[]> {
    const investment = await this.readInvestmentService.findAll({
      idUser: UserData.id,
      AccountIndex
    })

    return investment
  }

  @Mutation(() => Investment, { name: 'create_investment' })
  async create (@Body() data: GQLCreateInvestmentDTO): Promise<Investment> {
    const investment = await this.writeInvestmentService.create(data)

    return investment
  }

  @Query(() => Investment, { name: 'find_one_investment' })
  async findOne (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('AccountIndex', { type: () => Int }) AccountIndex: number,
      @Args('index', { type: () => Int }) index: number
  ): Promise<Investment> {
    const investment = await this.readInvestmentService.findOne({
      idUser: UserData.id,
      AccountIndex,
      index
    })

    if (investment === null) {
      throw new NotFoundException(InvestmentErrorsMessages.NotFound)
    }

    return investment
  }

  @Mutation(() => Investment, { name: 'delete_investment' })
  async delete (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('AccountIndex', { type: () => Int }) AccountIndex: number,
      @Args('index', { type: () => Int }) index: number
  ): Promise<void> {
    await this.writeInvestmentService.delete({
      idUser: UserData.id,
      AccountIndex,
      index
    })
  }

  @ResolveField(() => Account)
  async receiver (@Parent() investment: Investment): Promise<Account> {
    const receiver = await this.readAccountService.findByID({
      id: investment.idAccount
    })

    if (receiver === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    return receiver
  }
}
