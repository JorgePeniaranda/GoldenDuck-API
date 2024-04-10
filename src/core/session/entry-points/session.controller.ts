import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateSessionDTO } from '../domain/dto/create-session'
import { SessionService } from '../domain/service/session.service'
import { type Session } from '../domain/session.entity'
import { type SessionPrimitive } from '../domain/session.primitive'
import { SessionResponse } from './session.response'

@ApiResponse({
  type: SessionResponse
})
@ApiTags('Session')
@Controller('session')
export class SessionController {
  constructor (private readonly sessionService: SessionService) {}

  @Get()
  async getAllSession (): Promise<Session[]> {
    const sessions = await this.sessionService.findAll()

    if (sessions === null) {
      return []
    }

    return sessions
  }

  @Post()
  async createSession (@Body() data: CreateSessionDTO): Promise<Session> {
    const session = await this.sessionService.create(data)

    return session
  }

  @Get('/:id')
  async getSession (@Param('id', new ParseIntPipe()) id: SessionPrimitive['id']): Promise<Session> {
    const session = await this.sessionService.findOne(id)

    if (session === null) {
      throw new NotFoundException()
    }

    return session
  }

  @Delete('/:id')
  async deleteSession (@Param('id', new ParseIntPipe()) id: SessionPrimitive['id']): Promise<void> {
    await this.sessionService.delete(id)
  }
}
