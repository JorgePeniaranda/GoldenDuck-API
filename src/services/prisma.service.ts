import { ErrorsMessages } from '@/messages/error'
import {
  Injectable,
  Logger,
  ServiceUnavailableException,
  type OnModuleInit
} from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit (): Promise<void> {
    await this.$connect().catch(error => {
      if (error instanceof Prisma.PrismaClientInitializationError) {
        Logger.error(ErrorsMessages.DatabaseConnectionError)
        throw new ServiceUnavailableException(
          ErrorsMessages.DatabaseConnectionError
        )
      }

      throw error
    })
  }
}
