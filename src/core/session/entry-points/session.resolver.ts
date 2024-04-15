import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { ReadUserService } from '@/core/user/domain/service/read-user.service'
import { User } from '@/core/user/domain/user.entity'
import { CurrentUser } from '@/decorators/current-user.decorator'
import { Public } from '@/decorators/public.decorator'
import { GqlAuthGuard } from '@/guard/gql.guard'
import { UserErrorsMessages } from '@/messages/error/user'
import { NotFoundException, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { ReadSessionService } from '../domain/service/read-session.service'
import { WriteSessionService } from '../domain/service/write-session.service'
import { Session } from '../domain/session.entity'

@Public()
@UseGuards(GqlAuthGuard)
@Resolver(() => Session)
export class SessionResolver {
  constructor (
    private readonly writeSessionService: WriteSessionService,
    private readonly readSessionService: ReadSessionService,
    private readonly readUserService: ReadUserService
  ) {}

  @Query(() => [Session], { name: 'find_all_session' })
  async findAll (@CurrentUser() UserData: PayloadPrimitive): Promise<Session[]> {
    const sessions = await this.readSessionService.findAll({
      idUser: UserData.id
    })

    return sessions
  }

  @Query(() => Session, { name: 'find_one_session' })
  async findOne (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('index', { type: () => Int }) index: number
  ): Promise<Session> {
    const session = await this.readSessionService.findOne({ idUser: UserData.id, index })

    if (session === null) {
      throw new NotFoundException()
    }

    return session
  }

  @Mutation(() => Session, { name: 'delete_session' })
  async delete (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('index', { type: () => Int }) index: number
  ): Promise<void> {
    await this.writeSessionService.delete({ idUser: UserData.id, index })
  }

  @ResolveField(() => User)
  async user (@Parent() session: Session): Promise<User> {
    const user = await this.readUserService.findByID({
      id: session.idUser
    })

    if (user === null) {
      throw new NotFoundException(UserErrorsMessages.NotFound)
    }

    return user
  }
}