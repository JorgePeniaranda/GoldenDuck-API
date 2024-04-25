import { env } from '@/constants/env'
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from '../payload.entity'
import { type PayloadPrimitive } from '../primitive/payload.primitive'
import { ReadSessionService } from '@/core/session/domain/service/read-session.service'
import { SessionData } from '../session-data.entity'
import { ReadUserService } from '@/core/user/domain/service/read-user.service'
import { Messages } from '@/messages'
import { EntitiesName } from '@/constants/entities'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    private readonly readUserService: ReadUserService,
    private readonly readSessionService: ReadSessionService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
      passReqToCallback: true
    })
  }

  async validate (
    request: { headers: { authorization?: string } },
    payload: PayloadPrimitive
  ): Promise<PayloadPrimitive> {
    const token = request.headers.authorization?.split(' ')[1]

    if (token === undefined) {
      throw new UnauthorizedException()
    }

    const user = await this.readUserService.findByID({ id: payload.id })

    if (user === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.USER))
    }

    const sessionData = new SessionData({ token, user })
    const session = await this.readSessionService.findWithSessionData(sessionData)

    if (session === null || !session.active) {
      throw new UnauthorizedException()
    }

    return new JwtPayload({ id: payload.id, role: payload.role })
  }
}
