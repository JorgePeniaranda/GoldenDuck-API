import { type User } from '@/core/user/domain/user.entity'
import { Public } from '@/decorators/public.decorator'
import { LocalAuthGuard } from '@/guard/auth.guard'
import { JwtAuthGuard } from '@/guard/jwt.guard'
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { type JwtPayload } from '../domain/payload.entity'
import { AuthUseCase } from '../domain/service/auth.service'
import { type Token } from '../domain/token.entity'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthUseCase) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post()
  async login (@Request() req: { user: User }): Promise<Token> {
    return await this.authService.login(req.user)
  }

  /* test */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile (@Request() req: { user: JwtPayload }): Promise<JwtPayload> {
    return req.user
  }
}
