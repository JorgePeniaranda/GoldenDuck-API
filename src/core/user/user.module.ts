import { PrismaService } from '@/services/prisma.service'
import { forwardRef, Module } from '@nestjs/common'
import { AccountModule } from '../account/account.module'
import { UserRepositoryPrismaMySQL } from './data-access/user-prisma-mysql.repository'
import { ReadUserService } from './domain/service/read-user.service'
import { WriteUserService } from './domain/service/write-user.service'
import { UserController } from './entry-points/user.controller'
import { UserResolver } from './entry-points/user.resolver'

@Module({
  imports: [forwardRef(() => AccountModule)],
  controllers: [UserController],
  providers: [
    WriteUserService,
    ReadUserService,
    UserResolver,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryPrismaMySQL
    },
    PrismaService
  ],
  exports: [ReadUserService]
})
export class UserModule {}
