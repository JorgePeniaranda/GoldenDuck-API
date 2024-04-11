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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateNotificationDTO } from '../domain/dto/create-notification'
import { type Notification } from '../domain/notification.entity'
import { type NotificationPrimitive } from '../domain/notification.primitive'
import { NotificationService } from '../domain/service/transaction.service'
import { NotificationResponse } from './notification.response'

@ApiResponse({
  type: NotificationResponse
})
@ApiTags('Notification')
@ApiBearerAuth()
@Controller('notification')
export class NotificationController {
  constructor (private readonly notificationService: NotificationService) {}

  @Get()
  async getAllTransaction (@Body() id: NotificationPrimitive['id']): Promise<Notification[]> {
    const notifications = await this.notificationService.findAll(id)

    if (notifications === null) {
      return []
    }

    return notifications
  }

  @Post()
  async createAccount (@Body() data: CreateNotificationDTO): Promise<Notification> {
    const notification = await this.notificationService.create(data)

    return notification
  }

  @Get('/:id')
  async getTransaction (
    @Param('id', new ParseIntPipe()) id: NotificationPrimitive['id']
  ): Promise<Notification> {
    const notification = await this.notificationService.findOne(id)

    if (notification === null) {
      throw new NotFoundException()
    }

    return notification
  }

  @Delete('/:id')
  async deleteTransaction (
    @Param('id', new ParseIntPipe()) id: NotificationPrimitive['id']
  ): Promise<void> {
    await this.notificationService.delete(id)
  }
}
