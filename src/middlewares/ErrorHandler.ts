import ErrorsDictionary from '../messages/errors'
import { type Request, type Response, type NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

export default function ErrorHandler (
  error: any,
  _request: Request,
  response: Response,
  _next: NextFunction
): Response {
  switch (error.name) {
    // Prisma ORM errors
    case 'PrismaClientInitializationError':
      return response.status(StatusCodes.SERVICE_UNAVAILABLE).json({
        type: 'ServerError',
        message: ErrorsDictionary.DatabaseConnectionError
      })
    case 'PrismaClientKnownRequestError':
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        type: 'ORMError',
        message: ErrorsDictionary.KnownRequestError
      })
    case 'PrismaClientUnknownRequestError':
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        type: 'UnknownORMError',
        message: ErrorsDictionary.UnknownRequestError
      })
    case 'PrismaClientRustPanicError':
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        type: 'FatalORMError',
        message: ErrorsDictionary.PanicError
      })
    case 'PrismaClientValidationError':
      return response.status(StatusCodes.BAD_REQUEST).json({
        type: 'RequestError',
        message: ErrorsDictionary.ValidationError
      })
    // JSON Web Token errors
    case 'JsonWebTokenError':
    case 'TokenExpiredError':
    case 'NotBeforeError':
      return response.status(StatusCodes.UNAUTHORIZED).json({
        type: 'TokenError',
        message: ErrorsDictionary.InvalidToken
      })
    // Jose Web Token errors
    case 'JWTClaimValidationFailed':
    case 'JWTExpired':
    case 'JWTInvalid':
      return response.status(StatusCodes.UNAUTHORIZED).json({
        type: 'TokenError',
        message: ErrorsDictionary.InvalidToken
      })
    // Custom errors
    case 'ConfigError':
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        type: 'ConfigError',
        message: error.message
      })
    case 'ValidationError':
      return response.status(StatusCodes.BAD_REQUEST).json({
        type: 'ValidationError',
        message: error.message
      })
    case 'NotFoundError':
      return response.status(StatusCodes.NOT_FOUND).json({
        type: 'NotFoundError',
        message: error.message
      })
    case 'AuthorizationError':
      return response.status(StatusCodes.UNAUTHORIZED).json({
        type: 'AuthorizationError',
        message: error.message
      })
    case 'ConflictError':
      return response.status(StatusCodes.CONFLICT).json({
        type: 'ConflictError',
        message: error.message
      })
    case 'EmailError':
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        type: 'EmailError',
        message: error.message
      })
    case 'RequestError':
      return response.status(StatusCodes.BAD_REQUEST).json({
        type: 'RequestError',
        message: error.message
      })
    // Default error
    default:
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        type: 'UnknownError',
        message: ErrorsDictionary.UnknownError
      })
  }
}
