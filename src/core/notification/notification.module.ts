import { Module } from '@nestjs/common'
import { PrismaService } from '../../services/prisma.service'
import { NotificationRepositoryPrismaMySQL } from './data-access/notification-prisma-mysql.repository'
import { ReadNotificationService } from './domain/service/read-notification.service'
import { WriteNotificationService } from './domain/service/write-notification.service'
import { NotificationController } from './entry-points/notification.controller'

@Module({
  controllers: [NotificationController],
  providers: [
    WriteNotificationService,
    ReadNotificationService,
    {
      provide: 'NotificationRepository',
      useClass: NotificationRepositoryPrismaMySQL
    },
    PrismaService
  ],
  exports: [ReadNotificationService]
})
export class NotificationModule {}
