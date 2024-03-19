import { ErrorsDictionary } from '../messages/errors'
import { type Request, type NextFunction } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { type CustomResponse, type ErrorResponse } from '../types/response'

export function ErrorHandler (
  error: any,
  _request: Request,
  response: CustomResponse<ErrorResponse>,
  _next: NextFunction
): CustomResponse<ErrorResponse> {
  switch (error.name) {
    // Prisma ORM errors
    case 'PrismaClientInitializationError':
      return response.status(StatusCodes.SERVICE_UNAVAILABLE).json({
        status: ReasonPhrases.SERVICE_UNAVAILABLE,
        error: {
          type: 'ServerError',
          message: ErrorsDictionary.DatabaseConnectionError
        }
      })
    case 'PrismaClientKnownRequestError':
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ReasonPhrases.INTERNAL_SERVER_ERROR,
        error: {
          type: 'ORMError',
          message: ErrorsDictionary.KnownRequestError
        }
      })
    case 'PrismaClientUnknownRequestError':
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ReasonPhrases.INTERNAL_SERVER_ERROR,
        error: {
          type: 'UnknownORMError',
          message: ErrorsDictionary.UnknownRequestError
        }
      })
    case 'PrismaClientRustPanicError':
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ReasonPhrases.INTERNAL_SERVER_ERROR,
        error: {
          type: 'FatalORMError',
          message: ErrorsDictionary.PanicError
        }
      })
    case 'PrismaClientValidationError':
      return response.status(StatusCodes.BAD_REQUEST).json({
        status: ReasonPhrases.BAD_REQUEST,
        error: {
          type: 'RequestError',
          message: ErrorsDictionary.ValidationError
        }
      })
    // JSON Web Token errors
    case 'JsonWebTokenError':
    case 'TokenExpiredError':
    case 'NotBeforeError':
      return response.status(StatusCodes.UNAUTHORIZED).json({
        status: ReasonPhrases.UNAUTHORIZED,
        error: {
          type: 'TokenError',
          message: ErrorsDictionary.InvalidToken
        }
      })
    // Zod errors
    case 'ZodError':
      return response.status(StatusCodes.BAD_REQUEST).json({
        status: ReasonPhrases.BAD_REQUEST,
        error: {
          type: 'ValidationError',
          message: error.issues[0].message
        }
      })
    // Custom errors
    case 'ConfigError':
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ReasonPhrases.INTERNAL_SERVER_ERROR,
        error: {
          type: 'ConfigError',
          message: error.message
        }
      })
    case 'ValidationError':
      return response.status(StatusCodes.BAD_REQUEST).json({
        status: ReasonPhrases.BAD_REQUEST,
        error: {
          type: 'ValidationError',
          message: error.message
        }
      })
    case 'NotFoundError':
      return response.status(StatusCodes.NOT_FOUND).json({
        status: ReasonPhrases.NOT_FOUND,
        error: {
          type: 'NotFoundError',
          message: error.message
        }
      })
    case 'AuthorizationError':
      return response.status(StatusCodes.UNAUTHORIZED).json({
        status: ReasonPhrases.UNAUTHORIZED,
        error: {
          type: 'AuthorizationError',
          message: error.message
        }
      })
    case 'ConflictError':
      return response.status(StatusCodes.CONFLICT).json({
        status: ReasonPhrases.CONFLICT,
        error: {
          type: 'ConflictError',
          message: error.message
        }
      })
    case 'EmailError':
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ReasonPhrases.INTERNAL_SERVER_ERROR,
        error: {
          type: 'EmailError',
          message: error.message
        }
      })
    case 'RequestError':
      return response.status(StatusCodes.BAD_REQUEST).json({
        status: ReasonPhrases.BAD_REQUEST,
        error: {
          type: 'RequestError',
          message: error.message
        }
      })
    // Default error
    default:
      console.log(error)
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ReasonPhrases.INTERNAL_SERVER_ERROR,
        error: {
          type: 'UnknownError',
          message: ErrorsDictionary.UnknownError
        }
      })
  }
}
