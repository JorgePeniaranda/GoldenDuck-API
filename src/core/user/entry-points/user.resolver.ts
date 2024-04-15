import { PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { CurrentUser } from '@/decorators/current-user.decorator'
import { Public } from '@/decorators/public.decorator'
import { GqlAuthGuard } from '@/guard/gql.guard'
import { UserErrorsMessages } from '@/messages/error/user'
import { NotFoundException, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateUserDTO } from '../domain/dto/create-user.dto'
import { DeleteUserDTO } from '../domain/dto/delete-user.dto'
import { FindUserDTO } from '../domain/dto/find-user.dto'
import { UpdateUserDTO } from '../domain/dto/update-user.dto'
import { ReadUserService } from '../domain/service/read-user.service'
import { WriteUserService } from '../domain/service/write-user.service'
import { User } from '../domain/user.entity'

@Public()
@UseGuards(GqlAuthGuard)
@Resolver()
export class UserResolver {
  constructor (
    private readonly writeUserService: WriteUserService,
    private readonly readUserService: ReadUserService
  ) {}

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

  @Mutation(() => User, { name: 'create_user' })
  async create (@Args('user') user: CreateUserDTO): Promise<User> {
    return await this.writeUserService.create(user)
  }

  @Mutation(() => User, { name: 'update_user' })
  async update (
    @CurrentUser() UserData: { user: PayloadPrimitive },
      @Args('data') data: UpdateUserDTO
  ): Promise<User> {
    return await this.writeUserService.update({
      id: UserData.user.id,
      data
    })
  }

  @Mutation(() => User, { name: 'delete_user' })
  async delete (
    @CurrentUser() UserData: { user: PayloadPrimitive },
      @Args('data') data: DeleteUserDTO
  ): Promise<void> {
    await this.writeUserService.delete({
      id: UserData.user.id,
      data
    })
  }

  @Query(() => User, { name: 'find_user' })
  async findOne (@Args('params') params: FindUserDTO): Promise<User> {
    const user = await this.readUserService.findOne(params)

    if (user === null) {
      throw new NotFoundException(UserErrorsMessages.NotFound)
    }

    return user
  }

  @Mutation(() => User, { name: 'activate_user' })
  async activate (@CurrentUser() UserData: { user: PayloadPrimitive }): Promise<'🤠'> {
    await this.writeUserService.activate({
      id: UserData.user.id
    })

    return '🤠'
  }
}
