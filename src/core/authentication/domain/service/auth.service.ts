import { ReadUserService } from '@/core/user/domain/service/read-user.service'
import { type User } from '@/core/user/domain/user.entity'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { type JwtPayload } from '../payload.entity'
import { Token } from '../token.entity'

@Injectable()
export class AuthUseCase {
  constructor (
    private readonly readUserService: ReadUserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser (email: string, password: string): Promise<User | null> {
    const user = await this.readUserService.findOne({ email })

    if (user !== null && user.comparePassword(password)) {
      return user
    }

    return null
  }

  async login (user: User): Promise<Token> {
    const payload: JwtPayload = { id: user.id, role: user.role }
    const token = this.jwtService.sign(payload, {
      subject: user.id.toString()
    })

    return new Token(token)
  }
}
