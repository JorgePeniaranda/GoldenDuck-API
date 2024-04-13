import { type User } from '@/core/user/domain/user.entity'
import { UserRoles } from '@/core/user/domain/user.primitive'
import { Public } from '@/decorators/public.decorator'
import { Roles } from '@/decorators/roles.decorator'
import { LocalAuthGuard } from '@/guard/auth.guard'
import { JwtAuthGuard } from '@/guard/jwt.guard'
import { RolesGuard } from '@/guard/role.guard'
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { ApiBody, ApiExcludeEndpoint, ApiNoContentResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { LoginDTO } from '../domain/dto/login.dto'
import { type PayloadPrimitive } from '../domain/primitive/payload.primitive'
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

  @ApiNoContentResponse()
  @UseGuards(JwtAuthGuard)
  @Get()
  async verify (@Request() req: { user: PayloadPrimitive }): Promise<PayloadPrimitive> {
    return req.user
  }

  /* test */
  @ApiExcludeEndpoint()
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('test')
  async test (@Request() req: { user: PayloadPrimitive }): Promise<PayloadPrimitive> {
    console.log('TIME OUT STATED')
    this.authService.test()
    console.log('TIME OUT IN PROGRESS')

    return req.user
  }
}
