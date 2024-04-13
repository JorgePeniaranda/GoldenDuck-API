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
  Patch,
  Post,
  Request
} from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateMessageDTO } from '../domain/dto/create-message'
import { UpdateMessageDTO } from '../domain/dto/update-message'
import { type Message } from '../domain/messages.entity'
import { type MessagePrimitive } from '../domain/messages.primitive'
import { ReadMessageService } from '../domain/service/read-messages.service'
import { WriteMessageService } from '../domain/service/write-messages.service'
import { MessageResponse } from './messages.response'

@ApiResponse({
  type: MessageResponse
})
@ApiTags('Message')
@ApiBearerAuth()
@Controller('message')
export class MessageController {
  constructor (
    private readonly writeMessageService: WriteMessageService,
    private readonly readMessageService: ReadMessageService
  ) {}

  @Get()
  async findAll (@Request() UserData: { user: JwtPayload }): Promise<any> {
    const messages = await this.readMessageService.findAll({ idUser: UserData.user.id })

    if (messages === null) {
      return []
    }

    return messages
  }

  @Post()
  async createAccount (
    @Request() UserData: { user: JwtPayload },
      @Body() data: CreateMessageDTO
  ): Promise<Message> {
    const message = await this.writeMessageService.create({
      idSender: UserData.user.id,
      data
    })

    return message
  }

  @Get('/chat')
  async findHistory (@Request() UserData: { user: JwtPayload }): Promise<Message[]> {
    const messages = await this.readMessageService.findHistory({
      idUser: UserData.user.id
    })

    return messages
  }

  @Get('/chat/:idTarget')
  async findChat (
    @Request() UserData: { user: JwtPayload },
      @Param('idTarget', new ParseIntPipe())
      idTarget: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver']
  ): Promise<Message[]> {
    const messages = await this.readMessageService.findChat({
      idUser: UserData.user.id,
      idTarget
    })

    return messages
  }

  @Get('/chat/:idTarget/message/:index')
  async findOne (
    @Request() UserData: { user: JwtPayload },
      @Param('idTarget', new ParseIntPipe()) idTarget: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<Message> {
    const message = await this.readMessageService.findOne({
      idUser: UserData.user.id,
      idTarget,
      index
    })

    if (message === null) {
      throw new NotFoundException()
    }

    return message
  }

  @Patch('/chat/:idTarget/message/:index')
  async update (
    @Request() UserData: { user: JwtPayload },
      @Param('idTarget', new ParseIntPipe()) idTarget: number,
      @Param('index', new ParseIntPipe()) index: number,
      @Body() data: UpdateMessageDTO
  ): Promise<Message> {
    const message = await this.writeMessageService.update({
      idUser: UserData.user.id,
      idTarget,
      index,
      data
    })

    if (message === null) {
      throw new NotFoundException()
    }

    return message
  }

  @HttpCode(204)
  @Delete('/chat/:idTarget/message/:index')
  async delete (
    @Request() UserData: { user: JwtPayload },
      @Param('idTarget', new ParseIntPipe()) idTarget: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<void> {
    await this.writeMessageService.delete({
      idUser: UserData.user.id,
      idTarget,
      index
    })
  }

  @HttpCode(204)
  @Get('/chat/:idTarget/message/:index/read')
  async read (
    @Request() UserData: { user: JwtPayload },
      @Param('idTarget', new ParseIntPipe()) idTarget: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<void> {
    await this.writeMessageService.read({
      idUser: UserData.user.id,
      idTarget,
      index
    })
  }
}
