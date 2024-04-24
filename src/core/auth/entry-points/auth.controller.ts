import { type User } from '@/core/user/domain/user.entity'
import { UserRoles } from '@/core/user/domain/user.primitive'
import { ENDPOINT_INFO } from '@/decorators/endpoint.decorator'
import { Roles } from '@/decorators/roles.decorator'
import { LocalAuthGuard } from '@/guard/auth.guard'
import { JwtAuthGuard } from '@/guard/jwt.guard'
import { RolesGuard } from '@/guard/role.guard'
import { Controller, Get, Headers, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common'
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger'
import { LoginDTO, SWGLoginDTO } from '../domain/dto/login.dto'
import { JwtPayload } from '../domain/payload.entity'
import { type PayloadPrimitive } from '../domain/primitive/payload.primitive'
import { AuthService } from '../domain/service/auth.service'
import { type Token } from '../domain/token.entity'
import { TokenResponse } from './token.response'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  /* ---------- login ---------- */ // MARK: login
  @ENDPOINT_INFO({
    auth: false,
    body: SWGLoginDTO,
    response: TokenResponse,
    status: 200
  })
  @UseGuards(LocalAuthGuard)
  @Post()
  async login (@Request() req: { user: User }): Promise<Token> {
    return await this.authService.login(req.user)
  }

  /* ---------- verify ---------- */ // MARK: verify
  @ENDPOINT_INFO({
    auth: true,
    body: LoginDTO,
    response: JwtPayload,
    status: 204
  })
  @Get()
  async verify (@Request() req: { user: PayloadPrimitive }): Promise<PayloadPrimitive> {
    return req.user
  }

  /* ---------- logout ---------- */ // MARK: logout
  @ENDPOINT_INFO({
    auth: true,
    status: 204
  })
  @Get('logout')
  async loguot (@Headers() headers: { authorization?: string }, @Request() req: { user: PayloadPrimitive }): Promise<any> {
    const token = headers.authorization?.split(' ')[1]

    if (token === undefined) {
      throw new UnauthorizedException()
    }

    await this.authService.logout({
      token,
      idUser: req.user.id
    })
  }

  /* ---------- test ---------- */ // MARK: test
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
