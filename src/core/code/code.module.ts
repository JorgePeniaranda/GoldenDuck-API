import { Module } from '@nestjs/common'
import { PrismaService } from '../../services/prisma.service'
import { AuthModule } from '../auth/auth.module'
import { CodeRepositoryPrismaMySQL } from './data-access/code-prisma-mysql.repository'
import { ReadCodeService } from './domain/service/read-code.service'
import { WriteCodeService } from './domain/service/write-code.service'
import { CodeController } from './entry-points/code.controller'
import { UserModule } from '../user/user.module'

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
export class CodeModule {}
