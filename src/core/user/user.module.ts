import { PrismaService } from '@/services/prisma.service'
import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { UserRepositoryPrismaMySQL } from './data-access/user-prisma-mysql.repository'
import { ReadUserService } from './domain/service/read-user.service'
import { WriteUserService } from './domain/service/write-user.service'
import { UserController } from './entry-points/user.controller'

@Module({
  imports: [
    EventEmitterModule.forRoot()
  ],
  controllers: [UserController],
  providers: [
    WriteUserService,
    ReadUserService,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryPrismaMySQL
    },
    PrismaService
  ],
  exports: [ReadUserService]
})
export class UserModule {}
