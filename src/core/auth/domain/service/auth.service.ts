import { EntitiesName } from '@/constants/entities'
import { EventsMap } from '@/constants/events'
import { ReadUserService } from '@/core/user/domain/service/read-user.service'
import { type User } from '@/core/user/domain/user.entity'
import { type UserPrimitive } from '@/core/user/domain/user.primitive'
import { Messages } from '@/messages'
import { Injectable, NotFoundException } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from '../payload.entity'
import { SessionData } from '../session-data.entity'
import { Token } from '../token.entity'

@Injectable()
export class AuthService {
  constructor (
    private readonly readUserService: ReadUserService,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  /* ---------- validateUser ---------- */ // MARK: validateUser
  public async validateUser (email: string, password: string): Promise<User | null> {
    const user = await this.readUserService.findOne({ email })

    if (user !== null && user.comparePassword(password)) {
      return user
    }

    return null
  }

  /* ---------- login ---------- */ // MARK: login
  public async login (user: User): Promise<Token> {
    const payload = new JwtPayload({ id: user.id, role: user.role })
    const jwt = this.jwtService.sign(payload.toJSON(), {
      subject: user.id.toString()
    })

    const token = new Token(jwt)

    this.eventEmitter.emit(
      EventsMap.USER_LOGGED_IN,
      new SessionData({
        token: token.token,
        user: user.toJSON()
      })
    )

    return token
  }

  /* ---------- logout ---------- */ // MARK: logout
  public async logout ({
    token,
    idUser
  }: {
    token: string
    idUser: UserPrimitive['id']
  }): Promise<void> {
    const user = await this.readUserService.findByID({ id: idUser })

    if (user === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.USER))
    }

    const sessionData = new SessionData({
      token,
      user: user.toJSON()
    })

    this.eventEmitter.emit(EventsMap.USER_LOGGED_OUT, sessionData)
  }
}
