import { Module } from '@nestjs/common'
import { PrismaService } from '../shared/prisma.repository'
import { MessageRepositoryPrismaMySQL } from './data-access/messages-prisma-mysql.repository'
import { MessageService } from './domain/service/messages.service'
import { MessageController } from './entry-points/messages.controller'

@Module({
  controllers: [MessageController],
  providers: [
    MessageService,
    {
      provide: 'MessageRepository',
      useClass: MessageRepositoryPrismaMySQL
    },
    PrismaService
  ]
})
export class MessageModule {}
