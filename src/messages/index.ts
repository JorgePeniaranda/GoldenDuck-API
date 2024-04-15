import { ErrorMessages } from './error.messages'
import { ResponseMessages } from './responses.messages'
import { ServerMessages } from './server.messages'

export const Messages = {
  error: ErrorMessages,
  response: ResponseMessages,
  server: ServerMessages
} as const
