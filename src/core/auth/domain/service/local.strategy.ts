import { type User } from '@/core/user/domain/user.entity'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ContextIdFactory, ModuleRef } from '@nestjs/core'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor (
    private readonly moduleRef: ModuleRef
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    })
  }

  async validate (request: Request, username: User['email'], password: User['password']): Promise<User> {
    const contextId = ContextIdFactory.getByRequest(request)
    const authService = await this.moduleRef.resolve(AuthService, contextId)

    const user = await authService.validateUser(username, password)

    if (user === null) {
      throw new UnauthorizedException()
    }

    return user
  }
}
