import { env } from '@/constants/env'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../user/user.module'
import { AuthUseCase } from './domain/service/auth.service'
import { JwtStrategy } from './domain/service/jwt.strategy'
import { LocalStrategy } from './domain/service/local.strategy'
import { AuthController } from './entry-points/auth.controller'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: {
        expiresIn: env.JWT_EXPIRATION_TIME
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthUseCase, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
