import { type JwtPayload } from '@/core/authentication/domain/payload.entity'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Request
} from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateSessionDTO } from '../domain/dto/create-session'
import { ReadSessionService } from '../domain/service/read-session.service'
import { WriteSessionService } from '../domain/service/write-session.service'
import { type Session } from '../domain/session.entity'
import { SessionResponse } from './session.response'

@ApiResponse({
  type: SessionResponse
})
@ApiTags('Session')
@ApiBearerAuth()
@Controller('/session')
export class SessionController {
  constructor (private readonly writeSessionService: WriteSessionService, private readonly readSessionService: ReadSessionService) {}

  @Get()
  async findAll (@Request() UserData: { user: JwtPayload }): Promise<Session[]> {
    const sessions = await this.readSessionService.findAll({
      idUser: UserData.user.id
    })

    return sessions
  }

  @Post()
  async create (@Body() data: CreateSessionDTO): Promise<Session> {
    const session = await this.writeSessionService.create(data)

    return session
  }

  @Get('/:index')
  async findOne (
    @Request() UserData: { user: JwtPayload },
      @Param('index', new ParseIntPipe()) index: number): Promise<Session> {
    const session = await this.readSessionService.findOne({ idUser: UserData.user.id, index })

    if (session === null) {
      throw new NotFoundException()
    }

    return session
  }

  @HttpCode(204)
  @Delete('/:index')
  async delete (
    @Request() UserData: { user: JwtPayload },
      @Param('index', new ParseIntPipe()) index: number): Promise<void> {
    await this.writeSessionService.delete({ idUser: UserData.user.id, index })
  }
}
