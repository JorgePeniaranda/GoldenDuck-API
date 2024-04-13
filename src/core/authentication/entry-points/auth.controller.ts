import { type User } from '@/core/user/domain/user.entity'
import { Public } from '@/decorators/public.decorator'
import { LocalAuthGuard } from '@/guard/auth.guard'
import { JwtAuthGuard } from '@/guard/jwt.guard'
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger'
import { LoginDTO } from '../domain/dto/login.dto'
import { type JwtPayload } from '../domain/payload.entity'
import { AuthService } from '../domain/service/auth.service'
import { type Token } from '../domain/token.entity'
import { TokenResponse } from './token.response'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @ApiResponse({
    type: TokenResponse
  })
  @ApiBody({
    type: LoginDTO
  })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post()
  async login (@Request() req: { user: User }): Promise<Token> {
    return await this.authService.login(req.user)
  }

  /* test */
  @ApiExcludeEndpoint()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async test (@Request() req: { user: JwtPayload }): Promise<JwtPayload> {
    return req.user
  }
}
