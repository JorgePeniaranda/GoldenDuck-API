import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { CurrentAPIUser } from '@/decorators/current-user.decorator'
import { ENDPOINT_INFO } from '@/decorators/endpoint.decorator'
import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ReadSessionService } from '../domain/service/read-session.service'
import { WriteSessionService } from '../domain/service/write-session.service'
import { type Session } from '../domain/session.entity'
import { SessionResponse } from './session.response'

@ApiTags('Session')
@Controller('/session')
export class SessionController {
  constructor (
    private readonly writeSessionService: WriteSessionService,
    private readonly readSessionService: ReadSessionService
  ) {}

  /* ---------- findAll ---------- */ // MARK: findAll
  @ENDPOINT_INFO({
    auth: true,
    response: SessionResponse,
    isArray: true,
    status: 200
  })
  @Get()
  async findAll (@CurrentAPIUser() UserData: PayloadPrimitive): Promise<Session[]> {
    const sessions = await this.readSessionService.findAll({
      idUser: UserData.id
    })

    return sessions
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  @ENDPOINT_INFO({
    auth: true,
    response: SessionResponse,
    status: 200
  })
  @Get('/:index')
  async findOne (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<Session> {
    const session = await this.readSessionService.findOne({ idUser: UserData.id, index })

    if (session === null) {
      throw new NotFoundException()
    }

    return session
  }

  /* ---------- delete ---------- */ // MARK: delete
  @ENDPOINT_INFO({
    auth: true,
    status: 204
  })
  @Delete('/:index')
  async delete (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<void> {
    await this.writeSessionService.delete({ idUser: UserData.id, index })
  }
}
