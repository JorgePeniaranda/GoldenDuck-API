import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { CurrentUser } from '@/decorators/current-user.decorator'
import { Public } from '@/decorators/public.decorator'
import { GqlAuthGuard } from '@/guard/gql.guard'
import { NotificationErrorsMessages } from '@/messages/error/notification'
import {
  NotFoundException,
  UseGuards
} from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Notification } from '../domain/notification.entity'
import { ReadNotificationService } from '../domain/service/read-notification.service'
import { WriteNotificationService } from '../domain/service/write-notification.service'

@Public()
@UseGuards(GqlAuthGuard)
@Resolver()
export class NotificationResolver {
  constructor (
    private readonly writeNotificationService: WriteNotificationService,
    private readonly readNotificationService: ReadNotificationService
  ) {}

  @Query(() => [Notification], { name: 'find_all_notification' })
  async findAll (@CurrentUser() UserData: PayloadPrimitive): Promise<Notification[]> {
    const notifications = await this.readNotificationService.findAll({ idUser: UserData.id })

    return notifications
  }

  @Query(() => [Notification], { name: 'find_one_notification' })
  async findOne (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('index', { type: () => Int }) index: number
  ): Promise<Notification> {
    const notification = await this.readNotificationService.findOne({
      idUser: UserData.id,
      index
    })

    if (notification === null) {
      throw new NotFoundException(NotificationErrorsMessages.NotFound)
    }

    return notification
  }

  @Mutation(() => [Notification], { name: 'delete_notification' })
  async delete (
    @CurrentUser() UserData: PayloadPrimitive,
      @Args('index', { type: () => Int }) index: number
  ): Promise<void> {
    await this.writeNotificationService.delete({ idUser: UserData.id, index })
  }
}
