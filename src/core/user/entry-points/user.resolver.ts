import { Account } from '@/core/account/domain/account.entity'
import { ReadAccountService } from '@/core/account/domain/service/read-account.service'
import { PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { CurrentUser } from '@/decorators/current-user.decorator'
import { Public } from '@/decorators/public.decorator'
import { GqlAuthGuard } from '@/guard/gql.guard'
import { UserErrorsMessages } from '@/messages/error/user'
import { NotFoundException, UseGuards } from '@nestjs/common'
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { GQLCreateUserDTO } from '../domain/dto/create-user.dto'
import { GQLDeleteUserDTO } from '../domain/dto/delete-user.dto'
import { GQLFindUserDTO } from '../domain/dto/find-user.dto'
import { GQLUpdateUserDTO } from '../domain/dto/update-user.dto'
import { ReadUserService } from '../domain/service/read-user.service'
import { WriteUserService } from '../domain/service/write-user.service'
import { User } from '../domain/user.entity'

@Public()
@UseGuards(GqlAuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor (
    private readonly writeUserService: WriteUserService,
    private readonly readUserService: ReadUserService,
    private readonly readAccountService: ReadAccountService
  ) {}

  /* ---------- findByID ---------- */ // MARK: findByID
  @Query(() => User, { name: 'current_user_info' })
  async findByID (@CurrentUser() UserData: PayloadPrimitive): Promise<User> {
    const user = await this.readUserService.findByID({
      id: UserData.id
    })

    if (user === null) {
      throw new NotFoundException(UserErrorsMessages.NotFound)
    }

    return user
  }

  /* ---------- create ---------- */ // MARK: create
  @Mutation(() => User, { name: 'create_user' })
  async create (@Args('user') user: GQLCreateUserDTO): Promise<User> {
    return await this.writeUserService.create(user)
  }

  /* ---------- update ---------- */ // MARK: update
  @Mutation(() => User, { name: 'update_user' })
  async update (
    @CurrentUser() UserData: { user: PayloadPrimitive },
      @Args('data') data: GQLUpdateUserDTO
  ): Promise<User> {
    return await this.writeUserService.update({
      id: UserData.user.id,
      data
    })
  }

  /* ---------- delete ---------- */ // MARK: delete
  @Mutation(() => User, { name: 'delete_user' })
  async delete (
    @CurrentUser() UserData: { user: PayloadPrimitive },
      @Args('data') data: GQLDeleteUserDTO
  ): Promise<void> {
    await this.writeUserService.delete({
      id: UserData.user.id,
      data
    })
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  @Query(() => User, { name: 'find_user' })
  async findOne (@Args('params') params: GQLFindUserDTO): Promise<User> {
    const user = await this.readUserService.findOne(params)

    if (user === null) {
      throw new NotFoundException(UserErrorsMessages.NotFound)
    }

    return user
  }

  /* ---------- activate ---------- */ // MARK: activate
  @Mutation(() => User, { name: 'activate_user' })
  async activate (@CurrentUser() UserData: { user: PayloadPrimitive }): Promise<'🤠'> {
    await this.writeUserService.activate({
      id: UserData.user.id
    })

    return '🤠'
  }

  /* ---------- accounts ---------- */ // MARK: accounts
  @ResolveField(() => [Account])
  async accounts (@Parent() user: User): Promise<Account[]> {
    const accounts = await this.readAccountService.findAll({
      idUser: user.id
    })

    return accounts
  }
}
