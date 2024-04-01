import { type User } from '@/core/user/domain/user.entity'
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { LocalAuthGuard } from '../domain/service/auth.guard'
import { AuthUseCase } from '../domain/service/auth.service'
import { JwtAuthGuard } from '../domain/service/jwt.guard'
import { type Token } from '../domain/token.entity'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthUseCase) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login (@Request() req: { user: User }): Promise<Token> {
    return await this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile (@Request() req: any): Promise<any> {
    return req.user
  }
}
