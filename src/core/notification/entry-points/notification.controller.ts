import { EntitiesName } from '@/constants/entities'
import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { ENDPOINT_INFO } from '@/decorators/endpoint.decorator'
import { Messages } from '@/messages'
import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Request
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { type Notification } from '../domain/notification.entity'
import { ReadNotificationService } from '../domain/service/read-notification.service'
import { WriteNotificationService } from '../domain/service/write-notification.service'
import { NotificationResponse } from './notification.response'

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor (
    private readonly writeNotificationService: WriteNotificationService,
    private readonly readNotificationService: ReadNotificationService
  ) {}

  /* ---------- findAll ---------- */ // MARK: findAll
  @ENDPOINT_INFO({
    auth: true,
    response: NotificationResponse,
    isArray: true,
    status: 200
  })
  @Get()
  async findAll (@Request() UserData: { user: PayloadPrimitive }): Promise<Notification[]> {
    const notifications = await this.readNotificationService.findAll({ idUser: UserData.user.id })

    return notifications
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  @ENDPOINT_INFO({
    auth: true,
    response: NotificationResponse,
    status: 200
  })
  @Get('/:index')
  async findOne (
    @Request() UserData: { user: PayloadPrimitive },
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<Notification> {
    const notification = await this.readNotificationService.findOne({
      idUser: UserData.user.id,
      index
    })

    if (notification === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.NOTIFICATION))
    }

    return notification
  }

  /* ---------- delete ---------- */ // MARK: delete
  @ENDPOINT_INFO({
    auth: true,
    status: 204
  })
  @Delete('/:index')
  async delete (
    @Request() UserData: { user: PayloadPrimitive },
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<void> {
    await this.writeNotificationService.delete({ idUser: UserData.user.id, index })
  }
}
