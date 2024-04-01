import { getEnvValue } from '@/utils/server'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from '../payload.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor () {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getEnvValue('JWT_SECRET')
    })
  }

  async validate (payload: JwtPayload): Promise<JwtPayload> {
    return new JwtPayload({ id: payload.id, role: payload.role })
  }
}
