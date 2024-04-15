import { type User } from '@/core/user/domain/user.entity'
import { Public } from '@/decorators/public.decorator'
import { GqlAuthGuard } from '@/guard/gql.guard'
import { Request, UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { JwtPayload } from '../domain/payload.entity'
import { type PayloadPrimitive } from '../domain/primitive/payload.primitive'
import { AuthService } from '../domain/service/auth.service'
import { Token } from '../domain/token.entity'

@Public()
@UseGuards(GqlAuthGuard)
@Resolver()
export class AuthResolver {
  constructor (private readonly authService: AuthService) {}

  @Query(() => Token, { name: 'login' })
  async login (@Request() req: { user: User }): Promise<Token> {
    return await this.authService.login(req.user)
  }

  @Query(() => JwtPayload, { name: 'verify_auth' })
  async verify (@Request() req: { user: PayloadPrimitive }): Promise<PayloadPrimitive> {
    return req.user
  }
}
