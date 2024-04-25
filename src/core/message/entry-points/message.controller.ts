import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { CurrentAPIUser } from '@/decorators/current-user.decorator'
import { ENDPOINT_INFO } from '@/decorators/endpoint.decorator'
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateMessageDTO, SWGCreateMessageDTO } from '../domain/dto/create-message'
import { SWGUpdateMessageDTO, UpdateMessageDTO } from '../domain/dto/update-message'
import { type Message } from '../domain/message.entity'
import { type MessagePrimitive } from '../domain/message.primitive'
import { ReadMessageService } from '../domain/service/read-messages.service'
import { WriteMessageService } from '../domain/service/write-messages.service'
import { MessageResponse } from './message.response'

@ApiTags('Message')
@Controller('chat')
export class MessageController {
  constructor (
    private readonly writeMessageService: WriteMessageService,
    private readonly readMessageService: ReadMessageService
  ) {}

  /* ---------- findAll ---------- */ // MARK: findAll
  @ENDPOINT_INFO({
    auth: true,
    response: MessageResponse,
    isArray: true,
    status: 200
  })
  @Get('all')
  async findAll (@CurrentAPIUser() UserData: PayloadPrimitive): Promise<any> {
    const messages = await this.readMessageService.findAll({ idUser: UserData.id })

    if (messages === null) {
      return []
    }

    return messages
  }

  /* ---------- findHistory ---------- */ // MARK: findHistory
  @ENDPOINT_INFO({
    auth: true,
    response: MessageResponse,
    isArray: true,
    status: 200
  })
  @Get('history')
  async findHistory (@CurrentAPIUser() UserData: PayloadPrimitive): Promise<Message[]> {
    const messages = await this.readMessageService.findHistory({
      idUser: UserData.id
    })

    return messages
  }

  /* ---------- findChat ---------- */ // MARK: findChat
  @ENDPOINT_INFO({
    auth: true,
    response: MessageResponse,
    isArray: true,
    status: 200
  })
  @Get('/:idTarget')
  async findChat (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('idTarget', new ParseIntPipe())
      idTarget: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver']
  ): Promise<Message[]> {
    const messages = await this.readMessageService.findChat({
      idUser: UserData.id,
      idTarget
    })

    return messages
  }

  /* ---------- create ---------- */ // MARK: create
  @ENDPOINT_INFO({
    auth: true,
    body: SWGCreateMessageDTO,
    response: MessageResponse,
    status: 204
  })
  @Post('/:idTarget')
  async create (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('idTarget', new ParseIntPipe()) idTarget: MessagePrimitive['idReceiver'],
      @Body() data: CreateMessageDTO
  ): Promise<Message> {
    const message = await this.writeMessageService.create({
      idSender: UserData.id,
      idTarget,
      data
    })

    return message
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  @ENDPOINT_INFO({
    auth: true,
    response: MessageResponse,
    status: 200
  })
  @Get('/:idTarget/message/:index')
  async findOne (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('idTarget', new ParseIntPipe()) idTarget: MessagePrimitive['idReceiver'],
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<Message> {
    const message = await this.readMessageService.findOne({
      idUser: UserData.id,
      idTarget,
      index
    })

    if (message === null) {
      throw new NotFoundException()
    }

    return message
  }

  /* ---------- update ---------- */ // MARK: update
  @ENDPOINT_INFO({
    auth: true,
    body: SWGUpdateMessageDTO,
    response: MessageResponse,
    status: 204
  })
  @Patch('/:idTarget/message/:index')
  async update (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('idTarget', new ParseIntPipe()) idTarget: MessagePrimitive['idReceiver'],
      @Param('index', new ParseIntPipe()) index: number,
      @Body() data: UpdateMessageDTO
  ): Promise<Message> {
    const message = await this.writeMessageService.update({
      idUser: UserData.id,
      idTarget,
      index,
      data
    })

    if (message === null) {
      throw new NotFoundException()
    }

    return message
  }

  /* ---------- delete ---------- */ // MARK: delete
  @ENDPOINT_INFO({
    auth: true,
    status: 204
  })
  @Delete('/:idTarget/message/:index')
  async delete (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('idTarget', new ParseIntPipe()) idTarget: MessagePrimitive['idReceiver'],
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<void> {
    await this.writeMessageService.delete({
      idUser: UserData.id,
      idTarget,
      index
    })
  }

  /* ---------- read ---------- */ // MARK: read
  @ENDPOINT_INFO({
    auth: true,
    status: 204
  })
  @Get('/:idTarget/message/:index/read')
  async read (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('idTarget', new ParseIntPipe()) idTarget: MessagePrimitive['idReceiver'],
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<void> {
    await this.writeMessageService.read({
      idUser: UserData.id,
      idTarget,
      index
    })
  }
}
