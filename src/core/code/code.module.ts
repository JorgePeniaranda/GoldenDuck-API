import { Module } from '@nestjs/common'
import { PrismaService } from '../../services/prisma.service'
import { AuthModule } from '../auth/auth.module'
import { CodeRepositoryPrismaMySQL } from './data-access/code-prisma-mysql.repository'
import { ReadCodeService } from './domain/service/read-code.service'
import { WriteCodeService } from './domain/service/write-code.service'
import { CodeController } from './entry-points/code.controller'
import { UserModule } from '../user/user.module'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { EventsMap } from '@/constants/events'
import { type UserPrimitive } from '../user/domain/user.primitive'

@Module({
  imports: [AuthModule, UserModule],
  controllers: [CodeController],
  providers: [
    WriteCodeService,
    ReadCodeService,
    {
      provide: 'CodeRepository',
      useClass: CodeRepositoryPrismaMySQL
    },
    PrismaService
  ],
  exports: [ReadCodeService]
})
export class CodeModule {
  constructor (
    private readonly eventEmitter: EventEmitter2
  ) {
    // #region EVENTS SUBSCRIPTION
    /* ------------------------- USER EVENTS ------------------------- */

    this.eventEmitter.on(EventsMap.USER_CREATED, (data: UserPrimitive) => {
      const params: Parameters<WriteCodeService['create']>[0] = {
        email: data.email,
        phoneNumber: data.phoneNumber
      }

      console.log(data)

      this.eventEmitter.emit(EventsMap.SEND_VALIDATON_CODE, params)
    })
  }
}
