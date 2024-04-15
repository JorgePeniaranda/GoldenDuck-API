import { Account } from '@/core/account/domain/account.entity'
import { ReadAccountService } from '@/core/account/domain/service/read-account.service'
import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { CurrentUser } from '@/decorators/current-user.decorator'
import { Public } from '@/decorators/public.decorator'
import { GqlAuthGuard } from '@/guard/gql.guard'
import { AccountErrorsMessages } from '@/messages/error/account'
import { Body, NotFoundException, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Card } from '../domain/card.entity'
import { GQLCreateCardDTO } from '../domain/dto/create-card'
import { ReadCardService } from '../domain/service/read-card.service'
import { WriteCardService } from '../domain/service/write-card.service'

@Public()
@UseGuards(GqlAuthGuard)
@Resolver(() => Card)
export class CardResolver {
  constructor (
    private readonly writeCardService: WriteCardService,
    private readonly readCardService: ReadCardService,
    private readonly readAccountService: ReadAccountService
  ) {}

  @Query(() => Card, { name: 'find_all_card' })
  async findAll (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('AccountIndex', { type: () => Int }) AccountIndex: number
  ): Promise<Card[]> {
    const cards = await this.readCardService.findAll({
      idUser: UserData.id,
      AccountIndex
    })

    if (cards === null) {
      return []
    }

    return cards
  }

  @Mutation(() => Card, { name: 'create_card' })
  async create (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('AccountIndex', { type: () => Int }) AccountIndex: number,
      @Body() data: GQLCreateCardDTO
  ): Promise<Card> {
    const card = await this.writeCardService.create({
      idUser: UserData.id,
      AccountIndex,
      data
    })

    return card
  }

  @Query(() => Card, { name: 'find_one_card' })
  async findOne (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('AccountIndex', { type: () => Int }) AccountIndex: number,
      @Args('index', { type: () => Int }) index: number
  ): Promise<Card> {
    const card = await this.readCardService.findOne({
      idUser: UserData.id,
      AccountIndex,
      index
    })

    if (card === null) {
      throw new NotFoundException()
    }

    return card
  }

  @Mutation(() => Card, { name: 'delete_card' })
  async delete (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('AccountIndex', { type: () => Int }) AccountIndex: number,
      @Args('index', { type: () => Int }) index: number
  ): Promise<void> {
    await this.writeCardService.delete({
      idUser: UserData.id,
      AccountIndex,
      index
    })
  }

  @ResolveField(() => Account)
  async accounts (@Parent() card: Card): Promise<Account> {
    const accounts = await this.readAccountService.findByID({
      id: card.idAccount
    })

    if (accounts === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    return accounts
  }
}
