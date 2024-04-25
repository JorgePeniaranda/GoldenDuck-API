import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { env } from 'process'
import { SessionModule } from '../session/session.module'
import { UserModule } from '../user/user.module'
import { AuthService } from './domain/service/auth.service'
import { JwtStrategy } from './domain/service/jwt.strategy'
import { LocalStrategy } from './domain/service/local.strategy'
import { AuthController } from './entry-points/auth.controller'
import { AuthResolver } from './entry-points/auth.resolver'

@Module({
  imports: [
    JwtModule.register({
      secret: env.JWT_SECRET,
      global: true,
      signOptions: {
        algorithm: 'HS256',
        allowInsecureKeySizes: false,
        allowInvalidAsymmetricKeyTypes: false,
        notBefore: '0s',
        noTimestamp: false,
        encoding: 'utf-8',
        expiresIn: env.JWT_EXPIRATION_MINUTES + 'm'
      },
      verifyOptions: {
        algorithms: ['HS256'],
        allowInvalidAsymmetricKeyTypes: false,
        ignoreNotBefore: false,
        ignoreExpiration: false,
        maxAge: env.JWT_EXPIRATION_MINUTES + 'm'
      }
    }),
    UserModule,
    SessionModule,
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
