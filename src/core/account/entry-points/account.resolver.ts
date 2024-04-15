import {
  NotFoundException,
  UseGuards
} from '@nestjs/common'

import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { CurrentUser } from '@/decorators/current-user.decorator'
import { Public } from '@/decorators/public.decorator'
import { GqlAuthGuard } from '@/guard/gql.guard'
import { AccountErrorsMessages } from '@/messages/error/account'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Account } from '../domain/account.entity'
import { ReadAccountService } from '../domain/service/read-account.service'
import { WriteAccountService } from '../domain/service/write-account.service'

@Public()
@UseGuards(GqlAuthGuard)
@Resolver()
export class AccountResolver {
  constructor (
    private readonly writeAccountService: WriteAccountService,
    private readonly readAccountService: ReadAccountService
  ) {}

  @Query(() => Account, { name: 'find_all_account' })
  async findAll (@CurrentUser() UserData: PayloadPrimitive): Promise<Account[]> {
    const accounts = await this.readAccountService.findAll({
      idUser: UserData.id
    })

    return accounts
  }

  @Mutation(() => Account, { name: 'create_account' })
  async create (@CurrentUser() UserData: PayloadPrimitive): Promise<Account> {
    const account = await this.writeAccountService.create({
      idUser: UserData.id
    })

    return account
  }

  @Query(() => Account, { name: 'find_one_account' })
  async findOne (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('index', { type: () => Int }) index: number
  ): Promise<Account> {
    const account = await this.readAccountService.findOne({ idUser: UserData.id, index })

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    return account
  }

  @Mutation(() => Account, { name: 'delete_account' })
  async delete (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('index', { type: () => Int }) index: number
  ): Promise<void> {
    await this.writeAccountService.delete({ idUser: UserData.id, index })
  }
}
