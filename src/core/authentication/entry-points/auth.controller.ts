import { type User } from '@/core/user/domain/user.entity'
import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { LocalAuthGuard } from '../domain/service/auth.guard'
import { AuthUseCase } from '../domain/service/auth.service'
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

  // @Get()
  // async getProfile (@Request() req: { user: JwtPayload }): Promise<JwtPayload> {
  //   return req.user
  // }
}
