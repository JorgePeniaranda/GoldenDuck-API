import { Module } from '@nestjs/common'
import { PrismaService } from '../../services/prisma.service'
import { UserModule } from '../user/user.module'
import { MessageRepositoryPrismaMySQL } from './data-access/message-prisma-mysql.repository'
import { ReadMessageService } from './domain/service/read-messages.service'
import { WriteMessageService } from './domain/service/write-messages.service'
import { MessageController } from './entry-points/message.controller'
import { MessageResolver } from './entry-points/message.resolver'

@Module({
  imports: [UserModule],
  controllers: [MessageController],
  providers: [
    WriteMessageService,
    ReadMessageService,
    MessageResolver,
    {
      provide: 'MessageRepository',
      useClass: MessageRepositoryPrismaMySQL
    },
    PrismaService
  ],
  exports: [ReadMessageService]
})
export class MessageModule {}
