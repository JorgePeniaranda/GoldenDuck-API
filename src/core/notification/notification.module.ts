import { Module } from '@nestjs/common'
import { PrismaService } from '../../services/prisma.service'
import { NotificationRepositoryPrismaMySQL } from './data-access/notification-prisma-mysql.repository'
import { NotificationService } from './domain/service/transaction.service'
import { NotificationController } from './entry-points/notification.controller'

@Module({
  controllers: [NotificationController],
  providers: [
    NotificationService,
    {
      provide: 'NotificationRepository',
      useClass: NotificationRepositoryPrismaMySQL
    },
    PrismaService
  ]
})
export class NotificationModule {}
