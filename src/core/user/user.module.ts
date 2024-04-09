import { PrismaService } from '@/services/prisma.service'
import { Module } from '@nestjs/common'
import { UserRepositoryPrismaMySQL } from './data-access/user-prisma-mysql.repository'
import { UserUseCase } from './domain/service/user.service'
import { UserController } from './entry-points/user.controller'

@Module({
  controllers: [UserController],
  providers: [
    UserUseCase,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryPrismaMySQL
    },
    PrismaService
  ],
  exports: [UserUseCase]
})
export class UserModule {}
