import { Module } from '@nestjs/common'
import { UserUseCase } from '../../application/usecase/user.usecase'
import { UserController } from '../controller/user.controller'
import { UserRepositoryPrismaMySQL } from '../repository/UserRepositoryPrismaMySQL'

@Module({
  controllers: [UserController],
  providers: [UserUseCase, {
    provide: 'UserRepository',
    useClass: UserRepositoryPrismaMySQL
  }]
})
export class UserModule {}
