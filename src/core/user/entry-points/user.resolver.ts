import { Public } from '@/decorators/public.decorator'
import { GqlAuthGuard } from '@/guard/gql.guard'
import { UserErrorsMessages } from '@/messages/error/user'
import { NotFoundException, UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ReadUserService } from '../domain/service/read-user.service'
import { User } from '../domain/user.entity'

@Public()
@Resolver()
export class UserResolver {
  constructor (private readonly readUserService: ReadUserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(_returns => User, { name: 'user' })
  async findOne (
    @Args('dni', { nullable: true }) dni: number,
      @Args('email', { nullable: true }) email: string,
      @Args('phoneNumber', { nullable: true }) phoneNumber: number
  ): Promise<User> {
    const user = await this.readUserService.findOne({
      dni: BigInt(dni),
      email,
      phoneNumber: BigInt(phoneNumber)
    })

    if (user === null) {
      throw new NotFoundException(UserErrorsMessages.NotFound)
    }

    return user
  }
}
