import { ErrorsMessages } from '@/messages/error'
import { Injectable, Logger, ServiceUnavailableException, type OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit (): Promise<void> {
    await this.$connect().catch((error) => {
      if(error.name === "PrismaClientInitializationError"){
        Logger.error(ErrorsMessages.DatabaseConnectionError)
        throw new ServiceUnavailableException(ErrorsMessages.DatabaseConnectionError)
      }

      throw error
    })
  }
}



// case 'PrismaClientInitializationError':
//   return response.status(StatusCodes.SERVICE_UNAVAILABLE).json({
//     status: ReasonPhrases.SERVICE_UNAVAILABLE,
//     error: {
//       type: 'ServerError',
//       message: ErrorsDictionary.DatabaseConnectionError
//     }
//   })
// case 'PrismaClientKnownRequestError':
//   return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//     status: ReasonPhrases.INTERNAL_SERVER_ERROR,
//     error: {
//       type: 'ORMError',
//       message: ErrorsDictionary.KnownRequestError
//     }
//   })
// case 'PrismaClientUnknownRequestError':
//   return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//     status: ReasonPhrases.INTERNAL_SERVER_ERROR,
//     error: {
//       type: 'UnknownORMError',
//       message: ErrorsDictionary.UnknownRequestError
//     }
//   })
// case 'PrismaClientRustPanicError':
//   return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//     status: ReasonPhrases.INTERNAL_SERVER_ERROR,
//     error: {
//       type: 'FatalORMError',
//       message: ErrorsDictionary.PanicError
//     }
//   })
// case 'PrismaClientValidationError':
//   return response.status(StatusCodes.BAD_REQUEST).json({
//     status: ReasonPhrases.BAD_REQUEST,
//     error: {
//       type: 'RequestError',
//       message: ErrorsDictionary.ValidationError
//     }
//   })