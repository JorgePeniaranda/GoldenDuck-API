import { Messages } from '@/messages'
import { type INestApplication, Logger } from '@nestjs/common'

export const getEnvValue = (envName: string, defaultValue?: string): string => {
  const envValue = process.env[envName]

  if (typeof envValue === 'string' && envValue.length > 0) {
    return envValue
  }

  if (typeof defaultValue === 'string') {
    Logger.warn(Messages.error.NoVariableEnv(envName))
    return defaultValue
  }

  Logger.error(Messages.error.EnvironmentVariableError(envName))
  throw new Error(Messages.error.EnvironmentVariableError(envName))
}

export const findAvailablePort = async (
  server: INestApplication,
  port: number | string
): Promise<number> => {
  if (typeof port === 'string') {
    port = parseInt(port)
  }

  if (Number.isNaN(port) || port < 0) {
    Logger.error(Messages.error.InvalidPortValue, 'NestApplication')
    throw new Error(Messages.error.InvalidPortValue)
  }

  server
    .listen(port)
    .then(() => {
      Logger.log(Messages.server.AppRunning(port), 'NestApplication')
    })
    .catch(async error => {
      if (error.code === 'EADDRINUSE') {
        return await findAvailablePort(server, port + 1)
      }
      throw error
    })

  return port
}
