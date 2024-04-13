import { EventsMap } from '@/constants/events'
import { ReadUserService } from '@/core/user/domain/service/read-user.service'
import { type User } from '@/core/user/domain/user.entity'
import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from '../payload.entity'
import { Token } from '../token.entity'

@Injectable()
export class AuthService {
  constructor (
    private readonly readUserService: ReadUserService,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  public async validateUser (email: string, password: string): Promise<User | null> {
    const user = await this.readUserService.findOne({ email })

    if (user !== null && user.comparePassword(password)) {
      return user
    }

    return null
  }

  public async login (user: User): Promise<Token> {
    const payload = new JwtPayload({ id: user.id, role: user.role })
    const token = this.jwtService.sign(payload.toJSON(), {
      subject: user.id.toString()
    })

    this.eventEmitter.emit(EventsMap.USER_LOGGED_IN, user)

    return new Token(token)
  }
}
